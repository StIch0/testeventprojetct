import { Dispatch } from 'react';
import { Alert } from 'react-native';
import { AnyAction } from 'redux';
import getEventList from '../../eventList/services/getEventList';
import { EventListItem } from '../../eventList/types';
import {
  FETCH_EVENT_LIST_ERROR,
  FETCH_EVENT_LIST_REQUEST,
  SET_EVENT_LIST
} from '../actionTypes/events';
import { AppThunk } from '../types';

interface ISetEventListAction {
  type: typeof SET_EVENT_LIST;
  eventList: EventListItem[];
}

interface IFetchEventListRequestAction {
  type: typeof FETCH_EVENT_LIST_REQUEST;
}

interface IFetchEventListErrorAction {
  type: typeof FETCH_EVENT_LIST_ERROR;
}

const fetchEvenListErrorAction = (): IFetchEventListErrorAction => ({
  type: 'FETCH_EVENT_LIST_ERROR'
});

const fetchEvenListRequestAction = (): IFetchEventListRequestAction => ({
  type: 'FETCH_EVENT_LIST_REQUEST'
});

const setEventListAction = (
  eventList: EventListItem[]
): ISetEventListAction => ({
  type: 'SET_EVENT_LIST',
  eventList
});

export const getEvents =
  (page: number): AppThunk =>
  async (dispatch: Dispatch<AnyAction | AppThunk>) => {
    dispatch(fetchEvenListRequestAction());
    try {
      const eventList = await getEventList({
        page
      });

      dispatch(setEventListAction(eventList));
    } catch (error) {
      dispatch(fetchEvenListErrorAction());
      Alert.alert('Error', (error as Error).message);
    }
  };

export type EventActionType =
  | ISetEventListAction
  | IFetchEventListRequestAction
  | IFetchEventListErrorAction;
