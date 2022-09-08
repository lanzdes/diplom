import { createSlice, createAction } from '@reduxjs/toolkit';
import axios, { Axios } from 'axios';
import { IFilmsInfo, IFilm, IFilmSendRequest } from '../../types/films';
import { ACTIONS } from '../constants';
// const axios = require('axios');
//const API_URL = 'https://studapi.teachmeskills.by/blog/films/?limit=20';
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';
const API_URL_SEACH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword';
const API_URL_TRENDS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres';
const API_KEY = 'f9d29e71-35a9-4ad2-8bac-ccab57a25280';

export const sendFilmAction = createAction<IFilmSendRequest>(ACTIONS.SEND_FILM);

export const getMyFilmsAction = createAction(ACTIONS.GET_MY_FILMS);

interface IFilmState {
  films: IFilmsInfo | null;
  isShowModalFilm: boolean;
  selectedFilm: IFilm | null;
  selectedFilmsList: IFilm[] | null;
  isShowModalFilmsList: boolean;
  isEditMode: boolean;
  searchValue: string;
  orderingValue: string;
  myFilms: IFilm[] | null;
  isSendedFilm: boolean;
}

const initialState: IFilmState = {
  films: null,
  isShowModalFilm: false,
  selectedFilm: null,
  selectedFilmsList: null,
  isShowModalFilmsList: false,
  isEditMode: false,
  searchValue: '',
  orderingValue: '',
  myFilms: null,
  isSendedFilm: false,
};

const MONTH = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

export const filmsSlide = createSlice({
  name: 'films',
  initialState,
  reducers: {
    addFilms: (state, action) => {
      let list = action.payload.items;
      if (!list) list = action.payload.films;
      const films = list.map((film: IFilm) => ({
        ...film,
        rating: !film.rating ? film.ratingKinopoisk : film.rating,
        isFavorite: false,
      }));
      state.films = { ...action.payload, results: films };
    },
    removeFilms: (state) => {
      state.films = null;
    },
    toggleFavorite: (state, action) => {
      if (state.films) {
        const newFilms = state?.films.results.map((film: IFilm) => ({
          ...film,
          isFavorite: film.kinopoiskId === action.payload ? !film.isFavorite : film.isFavorite,
        }));
        state.films = { ...state.films, results: newFilms };
      }
    },
    setIsShowModalFilm: (state, action) => {
      state.isShowModalFilm = action.payload;
    },
    setSelectedFilm: (state, action) => {
      state.selectedFilm = action.payload;
    },
    setIsShowModalFilmsList: (state, action) => {
      state.isShowModalFilmsList = action.payload;
    },
    setSelectedFilmsList: (state, action) => {
      state.selectedFilmsList = state.selectedFilmsList ? [...state.selectedFilmsList, ...action.payload] : action.payload;
    },
    setIsEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setOrderingValue: (state, action) => {
      state.orderingValue = action.payload;
    },
    setMyFilms: (state, action) => {
      state.myFilms = action.payload;
    },
    setIsSendedFilm: (state, action) => {
      state.isSendedFilm = action.payload;
    },
    // getTodo: (state, action) => {
    //   state.data = [action.payload];
    // },
  },
});

export const getFilmsAsync =
  ({ searchValue, orderingValue }: { searchValue: string; orderingValue: string }) =>
  async (dispatch: any) => {
    try {
      //const response = await axios.get(`${API_URL}&search=${searchValue}&ordering=${orderingValue}`, {
      //  headers: { 'X-API-KEY': 'f9d29e71-35a9-4ad2-8bac-ccab57a25280', 'Content-Type': 'application/json' },
      //});
      let url = API_URL;
      if (searchValue) {
        url = `${API_URL_SEACH}?keyword=${searchValue}`;
      } else {
        if (orderingValue) {
          url += `?order=${orderingValue}`;
        }
      }
      const response = await axios.get(url, {
        headers: { 'X-API-KEY': `${API_KEY}`, 'Content-Type': 'application/json' },
      });
      dispatch(addFilms(response.data));
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const getTrendsAsync = () => async (dispatch: any) => {
  try {
    let now = new Date();
    const response = await axios.get(`${API_URL_TRENDS}?year=${now.getFullYear()}&month=${MONTH[now.getMonth()]}`, {
      headers: { 'X-API-KEY': `${API_KEY}`, 'Content-Type': 'application/json' },
    });
    dispatch(addFilms(response.data));
  } catch (err: any) {
    throw new Error(err);
  }
};

export const {
  addFilms,
  removeFilms,
  toggleFavorite,
  setIsShowModalFilm,
  setSelectedFilm,
  setIsShowModalFilmsList,
  setSelectedFilmsList,
  setIsEditMode,
  setSearchValue,
  setOrderingValue,
  setMyFilms,
  setIsSendedFilm,
} = filmsSlide.actions;

export const showFilms = ({ films: { films, searchValue, orderingValue, myFilms, isSendedFilm } }: { films: IFilmState }) => ({ films, searchValue, orderingValue, myFilms, isSendedFilm });

export const getSelectedFilm = (state: { films: IFilmState }) => state.films.selectedFilm;
export const getIsShowModalFilm = (state: { films: IFilmState }) => state.films.isShowModalFilm;
// export const getSelectedFilm = (state: { films: IFilmSate }) => state.films.selectedFilm;
export const getSelectedFilms = ({ films }: { films: IFilmState }) => ({
  selectedFilmsList: films?.selectedFilmsList,
  isShowModalFilmsList: films?.isShowModalFilmsList,
  isEditMode: films.isEditMode,
});
// export const showFavoritesFilms = (state: { films: IFilmSate }) =>
//   state.films || st.films.filter((film: IFilm) => film.isFavorite);
export default filmsSlide.reducer;

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
