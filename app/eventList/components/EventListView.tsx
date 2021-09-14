import { useIsFocused } from '@react-navigation/core';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { getEvents } from '../../redux/actions/events';
import { useRootSelector } from '../../redux/hooks';
import EventListItemView from './EventListItemView';

const keyExtractor = (eventId: string, index: number): string =>
  `${eventId}${index}`;

const renderItem = ({
  item: eventId
}: ListRenderItemInfo<string>): ReactElement => (
  <EventListItemView eventId={eventId} />
);

const separatorView = () => <View style={styles.separator} />;

const totalPage = 50;
const maxRefreshTimer = 15;

const EventListView = (): ReactElement => {
  const [isNeedLoading, setIsNeedLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [refreshTimer, setRefreshTimer] = useState(0);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    isFocused && getEventList(1);
  }, [isFocused, refreshing]);

  const getEventList = (prevPage: number): void => {
    setIsNeedLoading(false);

    const currentPage = Math.min(prevPage + 1, totalPage);

    dispatch(getEvents(currentPage));
    setRefreshing(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      getEventList(page);
    }, 1000 * 60);
    return () => {
      clearInterval(timer);
    };
  }, [page]);

  useEffect(() => {
    let timer: NodeJS.Timer | null = null;

    if (refreshTimer && (refreshing || refreshTimer < maxRefreshTimer)) {
      timer = setInterval(() => {
        setRefreshTimer(refreshTimer + 1);
      }, 1000 * 1);
    } else {
      timer && clearInterval(timer);
    }

    return () => {
      timer && clearInterval(timer);
    };
  }, [refreshTimer, refreshing]);

  const onEndReached = useCallback(() => {
    if (!isNeedLoading && page <= totalPage) {
      setPage(page + 1);
      setIsNeedLoading(true);
    }
  }, [isNeedLoading]);

  const onRefresh = useCallback(() => {
    console.log('refreshTimer', refreshTimer);

    if (!refreshTimer || refreshTimer === maxRefreshTimer) {
      setPage(0);
      setRefreshing(true);
      setRefreshTimer(1);
    }
  }, [refreshTimer]);

  const {
    events: { eventIdxList }
  } = useRootSelector();

  return (
    <FlatList
      data={eventIdxList}
      style={styles.container}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={separatorView}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      onEndReachedThreshold={0.2}
    />
  );
};

export default EventListView;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#fff',
    height: 2
  },
  container: {
    backgroundColor: '#fff'
  }
});
