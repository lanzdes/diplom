import { call, put, takeEvery } from 'redux-saga/effects';
import { AuthService } from '../../services/api/AuthService';
import { UserService } from '../../services/api/UserService';
import { ITokens, IProfile } from '../../types/user';
import { ACTIONS } from '../constants';
import { setProfile, setErrorActivation } from '../slices/authSlice';
import { FilmsService } from '../../services/api/FilmsService';
import { setIsSendedFilm, setMyFilms } from '../slices/filmsSlice';

function* getMyFilmsSaga() {
  try {
    const data: { data: ITokens } = yield call(() => FilmsService.getMyFilms());

    yield put(setMyFilms(data.data));
  } catch (e) {
    // console.log({ e });
    yield put(setErrorActivation('Error'));
  }
}

function* sendFilmSaga({ payload }: any) {
  try {
    yield call(() => FilmsService.sendFilm(payload));

    yield put(setIsSendedFilm(true));
  } catch (e) {
    // console.log({ e });
    yield put(setIsSendedFilm(false));
  }
}

export function* filmsSaga() {
  yield takeEvery(ACTIONS.SEND_FILM, sendFilmSaga);
  yield takeEvery(ACTIONS.GET_MY_FILMS, getMyFilmsSaga);
}
