import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { ColorService } from '../../../services/ColorService';

export enum ETypeInput {
  password = 'password',
  text = 'text',
  number = 'number',
}

interface IInput {
  value: string | number;
  type: ETypeInput;
  error: string;
  labelText: string;
  placeholder: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export const Input = ({ value, type, error, labelText, placeholder, disabled, onChange, onBlur }: IInput) => (
  <LabelStyled>
    {labelText}
    <InputStyled value={value} type={type} placeholder={placeholder} disabled={disabled} onChange={onChange} hasError={Boolean(error?.length)} onBlur={onBlur} />
    {error && <TextError>{error}</TextError>}
  </LabelStyled>
);

export const InputFixed = ({ value, type, error, labelText, placeholder, disabled, onChange, onBlur }: IInput) => (
  <LabelStyled>
    {labelText}
    <InputStyledFixed value={value} type={type} placeholder={placeholder} disabled={disabled} onChange={onChange} hasError={Boolean(error?.length)} onBlur={onBlur} />
  </LabelStyled>
);

const LabelStyled = styled.label`
  color: ${ColorService.WHITE};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  text-align: left;
`;

const InputStyled = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 16px 20px;
  background: ${ColorService.GRAPHITE};
  color: ${ColorService.WHITE};
  border: ${({ hasError }) => `2px solid ${hasError ? ColorService.ERROR : ColorService.GRAPHITE}`};
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  outline: none;
  margin: 8px 0 0;

  ::placeholder,
  ::-webkit-input-placeholder,
  :-ms-input-placeholder {
    color: ${ColorService.SECONDARY};
  }

  :focus {
    border: 2px solid ${ColorService.PRIMARY};
  }

  :disabled {
    background: ${ColorService.SECONDARY};
    border: 2px solid ${ColorService.SECONDARY};
  }
  :disabled::placeholder,
  :disabled::-webkit-input-placeholder {
    color: ${ColorService.LIGHT};
  }
`;

const InputStyledFixed = styled(InputStyled)`
  position: fixed;
  top: 20px;
  left: 290px;
  width: calc(100% - 520px);
  z-index: 2;
`;

const TextError = styled.span`
  color: ${ColorService.ERROR};
  font-size: 16px;
  line-height: 24px;
  display: block;
  font-weight: 500;
  margin: 8px 0 0;
`;
