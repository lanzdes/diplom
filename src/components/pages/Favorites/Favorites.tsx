import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import { showFilms, getFilmsAsync, removeFilms, toggleFavorite } from '../../../core/slices/filmsSlice';
import { IFilmsInfo } from '../../../types/films';
import { Input } from '../../atoms/Input';
import { ETypeInput } from '../../atoms/Input/Input';
import { Modal } from '../../templates/Modal/Modal';

// interface IFilm {
//   author: number;
//   date: string;
//   id: number;
//   image: string;
//   lesson_num: number;
//   text: string;
//   title: string;
//   isFavorite: boolean;
// }

// interface IFilmsInfo {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: IFilm[];
// }

export const FavoritesPage = () => {
  // const [sendedUser, setSendedUser] = useState(false);

  const { films } = useSelector(showFilms);
  //  // console.log('FavoritesPage', { filmsStore });
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);

  // const [films, setFilms] = useState<IFilmsInfo>();
  const [filmsV2, setFilmsV2] = useState<IFilmsInfo>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [orderingValue, setOrderingValue] = useState<string>('');

  const onChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    setSearchValue(event.target.value);
  };

  const searchInput = {
    value: searchValue,
    error: '',
    type: ETypeInput.text,
    labelText: 'Search',
    placeholder: 'Placeholder',
    disabled: false,
  };

  const onBlur = () => {};

  const fields = [
    {
      fieldName: 'lesson_num',
      name: 'Lesson number',
    },
    {
      fieldName: 'date',
      name: 'Date',
    },
    {
      fieldName: 'Title',
      name: 'title',
    },
    {
      fieldName: 'author',
      name: 'Author ID',
    },
  ];

  const onChangeOrdering = (field: string) => {
    // console.log({ field });
    setOrderingValue(field);
  };

  const onClose = () => {
    setHidden(true);
  };

  return (
    // <FormTemplate title="Sign in">
    <>
      <button onClick={() => dispatch(removeFilms())}>Clear films</button>
      Films:
      <TabsOrdering>
        {fields.map(({ fieldName, name }) => (
          <Li key={fieldName} onClick={() => onChangeOrdering(fieldName)}>
            {name}
          </Li>
        ))}
      </TabsOrdering>
      <Input {...searchInput} onChange={(event) => onChange(event, 'searchValue')} onBlur={onBlur} />
      <List>
        {films?.results?.map(({ year, nameRu, kinopoiskId, rating, isFavorite }) => (
          <>
            {isFavorite ? (
              <LiFilm key={kinopoiskId}>
                <p>Favorite: {isFavorite ? 'yes' : 'no'}</p>
                <button onClick={() => dispatch(toggleFavorite(kinopoiskId))}>{isFavorite ? 'Remove' : 'Add'}</button>
                date: {year} - title: {nameRu} - рейтинг: {rating}
              </LiFilm>
            ) : null}
          </>
        ))}
      </List>
      {!hidden && (
        <Modal onClose={onClose}>
          <p>Hello</p>
        </Modal>
      )}
      <button onClick={() => setHidden(false)}>Open Modal</button>
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
