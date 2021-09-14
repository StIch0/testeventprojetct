import {
  NavigationProp,
  useNavigation,
  ParamListBase
} from '@react-navigation/core';

const useRootNavigation = <T extends ParamListBase>() =>
  useNavigation<NavigationProp<T>>();

export { useRootNavigation };
