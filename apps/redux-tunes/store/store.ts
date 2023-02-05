import {
  Action,
  combineReducers,
  configureStore,
  Reducer,
} from '@reduxjs/toolkit';

import { AppState } from '.';
import { tunesSlice } from './tunes/tunes.reducer';

const combinedReducer = combineReducers({
  [tunesSlice.name]: tunesSlice.reducer,
});

const rootReducer: Reducer = (state: AppState, action: Action) => {
  return combinedReducer(state, action);
};

function makeStore() {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {},
    devTools: process.env.NODE_ENV !== 'production' && {
      name: 'TUNES_STORE',
    },
  });
}

export const store = makeStore();
