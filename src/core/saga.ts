import { all } from 'redux-saga/effects';

import { authSaga, filmsSaga } from './sagas';

export function* rootSaga() {
  try {
    yield all([authSaga(), filmsSaga()]);
  } catch (e) {
    // console.log({ e });
  }
}
