import { ImageType } from 'react-images-uploading';

export interface IFilm {
  kinopoiskId: number;
  nameRu: string;
  nameOriginal: string;
  posterUrlPreview: string;
  posterUrl: string;
  year: number;
  rating: number;
  ratingImdb: number;
  ratingKinopoisk: number;
  filmLength: number;
  description: string;
  isFavorite: boolean;
  genres: IGenre[];
}

export interface IGenre {
  genre: string;
}

export interface IFilmsInfo {
  count: number;
  next: string | null;
  previous: string | null;
  results: IFilm[];
}

export interface IFilmSendRequest {
  image: ImageType;
  text: string;
  lesson_num: number;
  title: string;
}
