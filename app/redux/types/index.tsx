import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { EventState } from '../reducers/events';

type RootState = {
  events: EventState;
};

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<any>
>;

export { RootState, AppThunk };
