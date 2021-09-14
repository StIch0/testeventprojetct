import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import configureStore from '../redux/store';
import RootStackNavigator from './RootStackNavigator';

const { store } = configureStore();

const AppNavigator = (): React.ReactElement => (
  <Provider store={store}>
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  </Provider>
);

export default AppNavigator;
