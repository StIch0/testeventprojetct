import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack';
import React, { ReactElement } from 'react';
import EventListScreen from '../eventList/containers/EventListScreen';
import EventScreen from '../eventScreen/containers/EventScreen';
import { RootStackParamList } from './types';

const RootStackNavigator = (): ReactElement => {
  const Stack = createStackNavigator<RootStackParamList>();

  const eventListOptions: StackNavigationOptions = {
    title: 'Events'
  };

  const eventScreenOptions: StackNavigationOptions = {
    title: `Event`,
    headerBackTitle: 'Back'
  };

  return (
    <Stack.Navigator initialRouteName='EventListScreen'>
      <Stack.Screen
        name='EventListScreen'
        component={EventListScreen}
        options={eventListOptions}
      />
      <Stack.Screen
        name='EventScreen'
        component={EventScreen}
        options={eventScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
