import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { getStoreActivation, sendRegistrationConfirmAction } from '../../../core/slices/authSlice';
import { IUserConfirm } from '../../../types/user';
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

export const RegistrationActivation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { errorActivation, isSuccessActivation } = useSelector(getStoreActivation);

  console.log('RegistrationActivation');

  useEffect(() => {
    // eslint-disable-next-line no-debugger
    // debugger;
    // const uid = params?.uid;
    if (params?.uid && params?.token) {
      // console.log('')
      dispatch(
        sendRegistrationConfirmAction({
          uid: params?.uid as string,
          token: params?.token as string,
        }),
      );
    }
  }, [dispatch, params]);

  // useEffect(() => {
  //   if (isSuccessActivation) {
  //     setTimeout(() => {
  //       navigate('/films');
  //     }, 600);
  //   }
  // }, [isSuccessActivation, navigate]);

  return (
    // <FormTemplate title="Sign in">
    <>
      {errorActivation && <p>Error</p>}
      {isSuccessActivation && <p>SuccessActivation</p>}
      <button onClick={() => navigate('/films')}>Home</button>
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
