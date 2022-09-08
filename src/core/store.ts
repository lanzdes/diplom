import { configureStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit';
import filmsSlide from './slices/filmsSlice';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';

import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from './saga';
import authSlide from './slices/authSlice';

// const sagaMiddleware = createSagaMiddleware();

// export const initialRootState = {
//   ...store.getState(),
// };

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const combinedReducer = combineReducers({
  auth: authSlide,
  films: filmsSlide,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);
