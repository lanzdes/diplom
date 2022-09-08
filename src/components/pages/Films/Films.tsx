import { ReactNode, ChangeEvent, useState, useEffect, PropsWithChildren } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import {
  showFilms,
  getFilmsAsync,
  removeFilms,
  toggleFavorite,
  getIsShowModalFilm,
  getSelectedFilm,
  setIsShowModalFilm,
  setSelectedFilm,
  getSelectedFilms,
  setIsEditMode,
  setSelectedFilmsList,
  setIsShowModalFilmsList,
  setSearchValue,
  setOrderingValue,
} from '../../../core/slices/filmsSlice';
import { ColorService } from '../../../services';
import { IFilm, IFilmsInfo } from '../../../types/films';
import { InputFixed } from '../../atoms/Input';
import { ETypeInput } from '../../atoms/Input/Input';
import { Modal } from '../../templates/Modal/Modal';

export const FilmsPage = () => {
  // const [sendedUser, setSendedUser] = useState(false);

  const { films, searchValue, orderingValue } = useSelector(showFilms);
  const isShowModalFilm = useSelector(getIsShowModalFilm);
  const selectedFilm = useSelector(getSelectedFilm);
  const { selectedFilmsList, isShowModalFilmsList, isEditMode } = useSelector(getSelectedFilms);
  //  // console.log({ filmsStore, selectedFilmsList, isShowModalFilmsList });
  const dispatch = useDispatch();

  // const [films, setFilms] = useState<IFilmsInfo>();
  const [filmsV2, setFilmsV2] = useState<IFilmsInfo>();
  // const [searchValue, setSearchValue] = useState<string>('');
  // const [orderingValue, setOrderingValue] = useState<string>('');

  const [filmsLocal, setFilmsLocal] = useState<IFilm[]>();

  useEffect(() => {
    dispatch(getFilmsAsync({ searchValue, orderingValue }) as any);
  }, [searchValue, orderingValue, dispatch]);

  // useEffect(() => {
  //    // console.log('useEffect 2');
  //   if (searchValue.length) {
  //     const newFilms = films?.results.filter(
  //       (film: IFilm) => film.title.indexOf('searchValue') !== -1,
  //     );
  //     // const newFilms = films?.results.reduce((acc, ))
  //     if (newFilms) {
  //       setFilmsV2({ ...films, results: newFilms } as IFilmsInfo);
  //     }
  //   }
  // }, [films, searchValue]);

  const onChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    dispatch(setSearchValue(event.target.value));
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
      fieldName: 'RATING',
      name: 'Рейтинг',
    },
    {
      fieldName: 'YEAR',
      name: 'Год',
    },
  ];

  const onChangeOrdering = (field: string) => {
    // console.log({ field });
    dispatch(setOrderingValue(field));
  };

  const onSelectFilm = (film: IFilm) => {
    dispatch(setSelectedFilm(film));
    dispatch(setIsShowModalFilm(true));
  };

  const onSelectFilmLocal = (film: IFilm) => {
    if (isEditMode) {
      setFilmsLocal(filmsLocal ? [...filmsLocal, film] : [film]);
    }
  };

  const sendFilms = () => {
    dispatch(setSelectedFilmsList(filmsLocal));
    dispatch(setIsEditMode(false));
    setFilmsLocal([]);
  };

  return (
    // <FormTemplate title="Sign in">
    <>
      <TabsOrdering>
        {fields.map(({ fieldName, name }) => (
          <Li key={fieldName} onClick={() => onChangeOrdering(fieldName)}>
            {name}
          </Li>
        ))}
      </TabsOrdering>
      <InputFixed {...searchInput} labelText="" placeholder="Искать..." onChange={(event) => onChange(event, 'searchValue')} onBlur={onBlur} />
      <List>
        {films?.results?.map(({ year, nameRu, kinopoiskId, isFavorite, rating, posterUrlPreview, posterUrl, ...res }) => (
          <LiFilm
            key={kinopoiskId}
            onClick={() =>
              onSelectFilm({
                year,
                nameRu,
                kinopoiskId,
                isFavorite,
                posterUrlPreview,
                posterUrl,
                rating,
                ...res,
              })
            }>
            <Back back={posterUrlPreview}></Back>
            <div onClick={() => dispatch(toggleFavorite(kinopoiskId))}>{isFavorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}</div>
            {nameRu}
            <br />
            Год: {year}
            <Rating rating={rating}>{rating}</Rating>
          </LiFilm>
        ))}
      </List>
      {isShowModalFilm && <Modal onClose={() => dispatch(setIsShowModalFilm(false))}>{selectedFilm?.posterUrl && <Image src={selectedFilm?.posterUrl} alt="poster" />}</Modal>}
      {isShowModalFilmsList && (
        <Modal onClose={() => dispatch(setIsShowModalFilmsList(false))}>
          {selectedFilmsList?.map(({ year, nameRu, kinopoiskId, rating, isFavorite, ...res }) => (
            <LiFilm key={kinopoiskId}>
              id: {kinopoiskId} - title: {nameRu}
            </LiFilm>
          ))}
        </Modal>
      )}
    </>
    // </FormTemplate>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0 -20px;
`;

const Li = styled.li`
  background: ${ColorService.GRAPHITE};
  border-radius: 20px;
  color: ${ColorService.WHITE};
`;

const TabsOrdering = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  li {
    padding: 8px 20px;
    margin-right: 8px;
  }
`;

const LiFilm = styled.li`
  position: relative;
  color: ${ColorService.WHITE};
  width: 266px;
  margin: 30px 20px;
  cursor: pointer;
  transition: transform 0.2s ease-out;
  transform-origin: center;
  :hover {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  height: 100%;
`;

interface IBack {
  back: string;
}

const Back = styled.div<IBack>`
  background-image: url(${(props) => props.back});
  background-position: center;
  background-size: cover;
  height: 357px;
  border-radius: 20px;
`;

interface IRating {
  rating: number;
}

const Rating = styled.div<IRating>`
  position: absolute;
  top: 20px;
  left: 18.5px;
  padding: 2px 8px;
  border-radius: 6px;
  background: ${(props) => (props.rating >= 7 ? ColorService.GREEN : props.rating >= 5 ? ColorService.YELLOW : ColorService.ORANGE)};
`;
