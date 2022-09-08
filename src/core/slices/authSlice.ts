import { createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFilmsInfo, IFilm } from '../../types/films';
import { IUserConfirm, IProfile } from '../../types/user';
import { ACTIONS } from '../constants';
// const axios = require('axios');
// const API_URL = 'https://studapi.teachmeskills.by/blog/films/?limit=20';

interface IAuthSate {
  email: string | null;
  error: string | null;
  isSuccess: boolean;
  errorActivation: boolean;
  isSuccessActivation: boolean;
  profile: null | IProfile;
}

const initialState: IAuthSate = {
  email: null,
  error: null,
  isSuccess: false,
  errorActivation: false,
  isSuccessActivation: false,
  profile: null,
};

interface IUser {
  username: string;
  email: string;
  password: string;
}

interface ILoginUser {
  email: string;
  password: string;
}

export const sendRegistrationAction = createAction<IUser>(ACTIONS.SEND_REGISTRATION);
export const sendLoginAction = createAction<ILoginUser>(ACTIONS.SEND_LOGIN);
export const sendRegistrationConfirmAction = createAction<IUserConfirm>(ACTIONS.SEND_REGISTRATION_CONFIRM);
export const bootstrapSagaAction = createAction(ACTIONS.BOOTSTRAP_SAGA);

export const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setErrorActivation: (state, action) => {
      state.errorActivation = action.payload;
    },
    setIsSuccessActivation: (state, action) => {
      state.isSuccessActivation = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    // getTodo: (state, action) => {
    //   state.data = [action.payload];
    // },
  },
});

export const { setEmail, setError, setIsSuccess, setErrorActivation, setIsSuccessActivation, setProfile } = authSlide.actions;

// http://studapi.teachmeskills.by//activate/NDgw/b9jkno-b746256ae1fae9e3cf1c91a21f2bc338

// export const showFilms = ({
//   films: { films, searchValue, orderingValue },
// }: {
//   films: IAuthSate;
// }) => ({ films, searchValue, orderingValue });

export const getStoreActivation = ({ auth: { errorActivation, isSuccessActivation } }: { auth: IAuthSate }) => ({
  errorActivation,
  isSuccessActivation,
});

export const getStoreProfile = ({ auth: { profile } }: { auth: IAuthSate }) => profile;
// export const getSelectedFilm = (state: { films: IFilmSate }) => state.films.selectedFilm;
// export const getIsShowModalFilm = (state: { films: IFilmSate }) => state.films.isShowModalFilm;
// // export const getSelectedFilm = (state: { films: IFilmSate }) => state.films.selectedFilm;
// export const getSelectedFilms = ({ films }: { films: IFilmSate }) => ({
//   selectedFilmsList: films?.selectedFilmsList,
//   isShowModalFilmsList: films?.isShowModalFilmsList,
//   isEditMode: films.isEditMode,
// });
// export const showFavoritesFilms = (state: { films: IFilmSate }) =>
//   state.films || st.films.filter((film: IFilm) => film.isFavorite);
export default authSlide.reducer;

// || st.films.filter((film: IFilm) => film.isFavorite)

// export const getTodoAsync = (data) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${API_URL}/${data}`);
//     dispatch(getTodo(response.data));
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const addTodoAsync = (data) => async (dispatch) => {
//   try {
//     //  // console.log(data);
//     const response = await axios.film(API_URL, data);
//     //  // console.log(response);
//     dispatch(addTodo(response.data));
//   } catch (err) {
//     throw new Error(err);
//   }
// };
