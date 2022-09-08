import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import { showFilms, getFilmsAsync, removeFilms, toggleFavorite, getMyFilmsAction } from '../../../core/slices/filmsSlice';
import { IFilmsInfo } from '../../../types/films';
import { Input } from '../../atoms/Input';
import { ETypeInput } from '../../atoms/Input/Input';
import { Modal } from '../../templates/Modal/Modal';

export const MyFilms = () => {
  // const [sendedUser, setSendedUser] = useState(false);

  const { myFilms } = useSelector(showFilms);
  //  // console.log('FavoritesPage', { filmsStore });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyFilmsAction());
  }, [dispatch]);

  return (
    // <FormTemplate title="Sign in">
    <>
      <List>
        {myFilms?.map(({ year, nameRu, kinopoiskId, rating }) => (
          <LiFilm key={kinopoiskId}>
            date: {year} - title: {nameRu} - рейтинг: {rating}
          </LiFilm>
        ))}
      </List>
    </>
    // </FormTemplate>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ul``;

const Li = styled.li``;

const TabsOrdering = styled.ul`
  display: flex;
  flex-direction: row;

  li {
    padding: 20px;
    border: 1px solid black;
    margin: 4px;
  }
`;

const LiFilm = styled.li`
  border: 1px solid black;
  padding: 3px;
`;
