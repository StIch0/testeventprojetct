import uniqBy from 'lodash.uniqby';
import { EventListItem } from '../../eventList/types';
import { EventActionType } from '../actions/events';

export type EventState = {
  eventList: EventListItem[];
  eventIdxList: string[];
  eventsMap: Record<string, EventListItem>;
  loading: boolean;
};

const initialState: EventState = {
  eventList: [],
  eventIdxList: [],
  eventsMap: {},
  loading: false
};

export default (
  state: EventState = initialState,
  action: EventActionType
): EventState => {
  switch (action.type) {
    case 'FETCH_EVENT_LIST_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_EVENT_LIST_ERROR':
      return {
        ...state,
        loading: false
      };
    case 'SET_EVENT_LIST': {
      const uniqEventList = uniqBy<EventListItem>(
        state.eventList.concat(action.eventList),
        'id'
      );
      return {
        ...state,
        loading: false,
        eventList: uniqEventList,
        eventIdxList: uniqEventList.map((innerItem) => innerItem.id),
        eventsMap: uniqEventList.reduce((result, innerItem) => {
          result = {
            ...result,
            [innerItem.id]: innerItem
          };
          return result;
        }, {})
      };
    }

    default:
      return state;
  }
};
