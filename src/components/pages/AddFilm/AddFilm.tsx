import { ReactNode, ChangeEvent, useState, useEffect, SyntheticEvent } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import styled from 'styled-components';
import { sendFilmAction, showFilms } from '../../../core/slices/filmsSlice';

import { ValidationService } from '../../../services/ValidationService';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { ETypeInput } from '../../atoms/Input/Input';

interface IFilm {
  author: number;
  date: string;
  id: number;
  image: string;
  lesson_num: number;
  text: string;
  title: string;
}

interface IField {
  value: string;
  error: string;
  required: boolean;
  validationRules: string[];
  compareValue: '';
}

const defaultFilmState = {
  text: {
    value: '',
    error: '',
    required: true,
    validationRules: ['username'],
    compareValue: '',
  },
  lesson_num: {
    value: 0,
    error: '',
    required: true,
    validationRules: [],
    compareValue: '',
  },
  title: {
    value: '',
    error: '',
    required: true,
    validationRules: ['username'],
    compareValue: '',
  },
};

type TUser = typeof defaultFilmState;

export const AddFilm = () => {
  const [film, setFilm] = useState(defaultFilmState);
  const [images, setImages] = useState<ImageListType>([]);
  const { isSendedFilm } = useSelector(showFilms);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const PAGES = {
    MyFilms: '/my-films',
  };

  useEffect(() => {
    if (isSendedFilm) {
      setFilm(defaultFilmState);
      setTimeout(() => {
        navigate(PAGES.MyFilms);
      }, 500);
    }
  }, [PAGES.MyFilms, isSendedFilm, navigate]);

  const onChange = (event: ChangeEvent<HTMLInputElement>, field: keyof TUser) => {
    setFilm({
      ...film,
      [field]: {
        ...film[field],
        value: event.target.value,
        error: '',
      },
    });
  };

  const { title, text, lesson_num } = film;

  const inputValues = {
    value: text.value,
    type: 'text' as 'text',
    error: text.error,
    labelText: 'Username',
    placeholder: 'Placeholder',
    disabled: false,
  };

  const sendFilm = () => {
    dispatch(
      sendFilmAction({
        text: text.value,
        title: title.value,
        lesson_num: lesson_num.value,
        image: images[0],
      }),
    );
  };

  const onBlur = (field: keyof TUser) => {
    const { value, compareValue, required } = film[field];

    const res = ValidationService.checkField({
      rules: film[field].validationRules,
      required,
      value,
      compareValue: compareValue ? film[compareValue as keyof TUser]?.value : undefined,
    });
    setFilm({
      ...film,
      [field]: {
        ...film[field],
        error: res,
      },
    });
  };

  const onChangeImage = (imageList: ImageListType, addUpdateIndex?: Array<number>) => {
    setImages(imageList);
  };

  const isValidUser = ValidationService.checkObject(film) && Boolean(images.length);

  return (
    <>
      <InputWrapper>
        <Input onBlur={() => onBlur('title')} onChange={(event) => onChange(event, 'title')} {...inputValues} labelText="Title" value={title.value} error={title.error} type={ETypeInput.text} />
      </InputWrapper>
      <InputWrapper>
        <Input onBlur={() => onBlur('text')} onChange={(event) => onChange(event, 'text')} {...inputValues} labelText="Text" type={ETypeInput.text} />
      </InputWrapper>
      <InputWrapper>
        <Input
          onBlur={() => onBlur('lesson_num')}
          onChange={(event) => onChange(event, 'lesson_num')}
          {...inputValues}
          labelText="Lesson number"
          type={ETypeInput.number}
          value={lesson_num.value}
          error={lesson_num.error}
        />
      </InputWrapper>
      <ImageUploading multiple value={images} onChange={onChangeImage} dataURLKey="data_url" maxNumber={1}>
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {!images.length && (
              <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
                Click or Drop here
              </button>
            )}
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="300" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

      <Button text="Add film" theme="primary" onClick={() => sendFilm()} disabled={!isValidUser} />
    </>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;
