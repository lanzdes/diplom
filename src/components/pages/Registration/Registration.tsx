import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { sendRegistrationAction } from '../../../core/slices/authSlice';
import { validateEmail, validateName, validatePassword, validateConfirmPassword } from '../../../libs/validation';
import { ValidationService } from '../../../services/ValidationService';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { ETypeInput } from '../../atoms/Input/Input';
import { FormTemplate } from '../../templates/FormTemplate/FormTemplate';

interface IField {
  value: string;
  error: string;
  required: boolean;
  validationRules: string[];
  compareValue: '';
}

const defaultUserState = {
  username: {
    value: '',
    error: '',
    required: false,
    validationRules: ['usernames'],
    compareValue: '',
  },
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
  confirmPassword: {
    value: '',
    error: '',
    required: true,
    validationRules: ['password', 'confirmPassword'],
    compareValue: 'password',
  },
};

type TUser = typeof defaultUserState;

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(defaultUserState);

  const [sendedUser, setSendedUser] = useState(false);

  const { username, email, password, confirmPassword } = user;

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
    // console.log('onBlur', field);
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

    // console.log({ res });
    // if (field === 'email') {
    //   const isValidEmail = validateEmail(email.value);
    //   setUser({
    //     ...user,
    //     [field]: {
    //       ...user[field],
    //       value: user[field].value,
    //       error: isValidEmail ? '' : 'Invalid email',
    //     },
    //   });
    // }

    // if (field === 'username') {
    //   const isValidUsername = validateName(username.value);
    //   setUser({
    //     ...user,
    //     [field]: {
    //       ...user[field],
    //       value: user[field].value,
    //       error: isValidUsername ? '' : 'Username should be more than 1',
    //     },
    //   });
    // }

    // if (field === 'password') {
    //   const isValidPassword = validatePassword(password.value);
    //   setUser({
    //     ...user,
    //     [field]: {
    //       ...user[field],
    //       value: user[field].value,
    //       error: isValidPassword ? '' : 'Password should be more than 7',
    //     },
    //   });
    // }

    // if (field === 'confirmPassword') {
    //   const isValidConfirmPassword = validateConfirmPassword(password.value, confirmPassword.value);
    //   setUser({
    //     ...user,
    //     [field]: {
    //       ...user[field],
    //       value: user[field].value,
    //       error: isValidConfirmPassword ? '' : 'confirmPassword !== password',
    //     },
    //   });
    // }
  };

  const sendUser = () => {
    // console.log({ user });
    // setSendedUser(true);
    dispatch(
      sendRegistrationAction({
        username: user.username.value,
        email: user.email.value,
        password: user.password.value,
      }),
    );
  };

  const inputValues = {
    value: username.value,
    type: ETypeInput.text,
    error: username.error,
    labelText: 'Username',
    placeholder: 'Placeholder',
    disabled: false,
  };

  const isValidUser = ValidationService.checkObject(user);

  return (
    <>
      {/* <FormTemplate title="Sign in"> */}
      <InputWrapper>
        <Input onBlur={() => onBlur('username')} onChange={(event) => onChange(event, 'username')} {...inputValues} />
      </InputWrapper>
      <InputWrapper>
        <Input onBlur={() => onBlur('email')} onChange={(event) => onChange(event, 'email')} {...inputValues} labelText="Email" value={email.value} error={email.error} type={ETypeInput.text} />
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
      <InputWrapper>
        <Input
          onBlur={() => onBlur('confirmPassword')}
          onChange={(event) => onChange(event, 'confirmPassword')}
          {...inputValues}
          labelText="Confirm password"
          type={ETypeInput.password}
          value={confirmPassword.value}
          error={confirmPassword.error}
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
