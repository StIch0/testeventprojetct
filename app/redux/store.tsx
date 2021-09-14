import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Store
} from 'redux';
import thunk from 'redux-thunk';
import events from './reducers/events';

import { RootState } from './types';

interface IStore {
  store: Store<RootState, AnyAction>;
}

const rootReducer = combineReducers<RootState>({ events });

const middlewares = [thunk];

const configureStore = (): IStore => {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return { store };
};

export default configureStore;
