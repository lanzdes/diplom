import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { browserHistory } from 'react-router';
import { createBrowserHistory } from 'history';

import styled from 'styled-components';
import { sendLoginAction, sendRegistrationAction } from '../../../core/slices/authSlice';
import { validateEmail, validateName, validatePassword, validateConfirmPassword } from '../../../libs/validation';
import { ValidationService } from '../../../services/ValidationService';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { FormTemplate } from '../../templates/FormTemplate/FormTemplate';
import { useExitPrompt } from './useExitPrompt';
import { ETypeInput } from '../../atoms/Input/Input';

interface IField {
  value: string;
  error: string;
  required: boolean;
  validationRules: string[];
  compareValue: '';
}

const defaultUserState = {
  email: {
    value: '',
    error: '',
    required: true,
    validationRules: ['email'],
    compareValue: '',
  },
  password: {
    value: '',
    error: '',
    required: true,
    validationRules: ['password'],
    compareValue: '',
  },
};

type TUser = typeof defaultUserState;

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(defaultUserState);

  const [sendedUser, setSendedUser] = useState(false);

  const { email, password } = user;

  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

  // useEffect(() => {
  //   window.onbeforeunload = function (e) {
  //     console.log({ e, w: window.event });
  //     var event = e || window.event;

  //     // For IE and Firefox
  //     if (event) {
  //       event.returnValue = 'Leaving the page';
  //     }

  //     // For Safari
  //     return 'Leaving the page';
  //   };
  //   return () => {
  //     // setShowExitPrompt(false);
  //   };
  // }, []);

  const handleClick = (e: Event) => {
    e.preventDefault();
    // setShowExitPrompt(!showExitPrompt);
  };

  useEffect(() => {
    if (sendedUser) {
      navigate('/films');
    }
  }, [navigate, sendedUser]);

  const onChange = (event: ChangeEvent<HTMLInputElement>, field: keyof TUser) => {
    setUser({
      ...user,
      [field]: {
        ...user[field],
        value: event.target.value,
        error: '',
      },
    });
  };

  const onBlur = (field: keyof TUser) => {
    const { value, compareValue, required } = user[field];

    const res = ValidationService.checkField({
      rules: user[field].validationRules,
      required,
      value,
      compareValue: compareValue ? user[compareValue as keyof TUser]?.value : undefined,
    });
    setUser({
      ...user,
      [field]: {
        ...user[field],
        error: res,
      },
    });
  };

  const sendUser = () => {
    // console.log({ user });
    // setSendedUser(true);
    dispatch(
      sendLoginAction({
        email: user.email.value,
        password: user.password.value,
      }),
    );
  };

  const inputValues = {
    value: email.value,
    type: ETypeInput.text,
    error: email.error,
    labelText: 'Username',
    placeholder: 'Placeholder',
    disabled: false,
  };

  const isValidUser = ValidationService.checkObject(user);

  return (
    <>
      {/* <button onClick={handleClick}>Show/Hide the prompt</button> */}
      <InputWrapper>
        <Input onBlur={() => onBlur('email')} onChange={(event) => onChange(event, 'email')} {...inputValues} labelText="Email" value={email.value} error={email.error} />
      </InputWrapper>
      <InputWrapper>
        <Input
          onBlur={() => onBlur('password')}
          onChange={(event) => onChange(event, 'password')}
          {...inputValues}
          labelText="Password"
          type={ETypeInput.password}
          value={password.value}
          error={password.error}
        />
      </InputWrapper>

      <Button text="Sign Up" theme="primary" onClick={() => sendUser()} disabled={!isValidUser} />

      {/* </FormTemplate> */}
    </>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ul``;
