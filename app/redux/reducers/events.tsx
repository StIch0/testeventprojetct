import uniqBy from 'lodash.uniqby';
import { EventListItem } from '../../eventList/types';
import { EventActionType } from '../actions/events';

export type EventState = {
  eventList: EventListItem[];
  eventIdxList: string[];
  eventsMap: Record<string, EventListItem>;
};

const initialState: EventState = {
  eventList: [],
  eventIdxList: [],
  eventsMap: {}
};

export default (
  state: EventState = initialState,
  action: EventActionType
): EventState => {
  switch (action.type) {
    case 'SET_EVENT_LIST': {
      const uniqEventList = uniqBy<EventListItem>(
        state.eventList.concat(action.eventList),
        'id'
      );
      return {
        ...state,
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
