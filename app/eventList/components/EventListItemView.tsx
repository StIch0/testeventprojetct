import moment from 'moment';
import 'moment/locale/ru';
import React, { memo, ReactElement, useMemo } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useRootNavigation } from '../../navigation/hooks';
import { RootStackParamList } from '../../navigation/types';
import { useRootSelector } from '../../redux/hooks';

const { width } = Dimensions.get('window');

interface OwnProps {
  eventId: string;
}

const EventListItemView = ({ eventId }: OwnProps): ReactElement => {
  const {
    events: { eventsMap }
  } = useRootSelector();

  const eventItem = useMemo(() => eventsMap[eventId], [eventsMap, eventId]);

  const navigation = useRootNavigation<RootStackParamList>();

  const { actor, createdAt } = eventItem;

  const hasAvatarUri = useMemo(
    () => Boolean(actor.avatarUrl),
    [actor.avatarUrl]
  );

  const date = moment(createdAt).format('LLL');

  const onPressShowMoreInfo = (): void => {
    navigation.navigate('EventScreen', { eventId });
  };

  return (
    <Pressable style={styles.container} onPress={onPressShowMoreInfo}>
      {hasAvatarUri && (
        <Image source={{ uri: actor.avatarUrl }} style={styles.avatarImage} />
      )}
      <View style={styles.innerView}>
        <Text>Login: {actor.displayLogin}</Text>
        <Text>{date}</Text>
      </View>
    </Pressable>
  );
};

export default memo(EventListItemView);

const styles = StyleSheet.create({
  container: {
    height: 50,
    width,
    backgroundColor: '#dadada',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },
  avatarImage: {
    height: 50,
    width: 50
  },
  innerView: {
    marginLeft: 10
  }
});
