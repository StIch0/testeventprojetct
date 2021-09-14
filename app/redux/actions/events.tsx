import { Dispatch } from 'react';
import { Alert } from 'react-native';
import { AnyAction } from 'redux';
import getEventList from '../../eventList/services/getEventList';
import { EventListItem } from '../../eventList/types';
import { SET_EVENT_LIST } from '../actionTypes/events';
import { AppThunk } from '../types';

interface ISetEventListAction {
  type: typeof SET_EVENT_LIST;
  eventList: EventListItem[];
}

const setEventListAction = (
  eventList: EventListItem[]
): ISetEventListAction => ({
  type: 'SET_EVENT_LIST',
  eventList
});

export const getEvents =
  (page: number): AppThunk =>
  async (dispatch: Dispatch<AnyAction | AppThunk>) => {
    try {
      const eventList = await getEventList({
        page
      });

      dispatch(setEventListAction(eventList));
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

export type EventActionType = ISetEventListAction;
