import { RouteProp, useRoute } from '@react-navigation/core';
import React, { ReactElement, useMemo } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { useRootSelector } from '../../redux/hooks';

const { width } = Dimensions.get('window');

const EventScreenView = (): ReactElement => {
  const {
    params: { eventId }
  } = useRoute<RouteProp<RootStackParamList, 'EventScreen'>>();

  const {
    events: { eventsMap }
  } = useRootSelector();

  const {
    actor: { avatarUrl, displayLogin },
    repo: { name: repoName, url: repoUrl },
    type
  } = useMemo(() => eventsMap[eventId], [eventsMap, eventId]);

  const isAvatarUrlExist = useMemo(() => Boolean(avatarUrl), [avatarUrl]);

  const onPressUrl = (): void => {
    Linking.openURL(repoUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerView}>
        {isAvatarUrlExist && (
          <Image
            source={{ uri: avatarUrl }}
            style={styles.image}
            resizeMode='stretch'
          />
        )}
        <View style={styles.actorView}>
          <Text>Login: {displayLogin}</Text>
          <Text>Event type: {type}</Text>
        </View>
      </View>
      <View style={styles.repoView}>
        <Text style={styles.repoName}>Repo name {repoName}</Text>
        <Text>
          Repo url{' '}
          <Text onPress={onPressUrl} style={styles.repoUrl}>
            {repoUrl}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default EventScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  image: {
    width: width / 2,
    height: width / 2
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  repoView: {
    padding: 10
  },
  repoName: {
    fontSize: 14,
    lineHeight: 16
  },
  repoUrl: {
    fontSize: 14,
    lineHeight: 16,
    color: 'blue'
  },
  actorView: {
    margin: 10
  }
});
