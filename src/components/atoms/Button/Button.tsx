import { ReactNode } from 'react';
import styled from 'styled-components';

import { ColorService } from '../../../services/ColorService';
// import { default as logo } from '../../../assets/icons/favorite.svg';
// import { ReactComponent as Logo } from './favoritesIcon.svg';

const getTheme = (theme: 'primary' | 'secondary'): IButtonStyled => {
  if (theme === 'secondary') {
    return {
      bgDefault: ColorService.PRIMARY,
      bgHover: ColorService.PRIMARY_2,
      bgDisabled: ColorService.SECONDARY,
      color: ColorService.WHITE,
      colorHover: ColorService.WHITE,
      colorDisabled: ColorService.LIGHT,
    };
  }

  return {
    bgDefault: ColorService.GRAPHITE,
    bgHover: ColorService.GRAPHITE,
    bgDisabled: ColorService.SECONDARY,
    color: ColorService.WHITE,
    colorHover: ColorService.LIGHT,
    colorDisabled: ColorService.LIGHT,
  };
};

interface IButtonStyled {
  bgDefault: string;
  bgHover: string;
  bgDisabled: string;
  color: string;
  colorHover: string;
  colorDisabled: string;
}

interface IButton {
  text: string;
  disabled?: boolean;
  onClick: () => void;
  icon?: ReactNode;
  theme: 'primary' | 'secondary';
}

export const Button = ({ text, disabled, onClick, icon, theme }: IButton) => {
  const selectedTheme = getTheme(theme);
  return (
    <ButtonStyled onClick={onClick} disabled={disabled} {...selectedTheme}>
      {icon}
      {text}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<IButtonStyled>`
  padding: 17px 32px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ bgDefault }) => bgDefault};
  color: ${({ color }) => color};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  min-width: 200px;
  transition: all 0.3s ease-out;

  svg {
    margin-right: 10px;
  }

  :disabled {
    background: ${({ bgDisabled }) => bgDisabled};
    pointer-events: none;
    color: ${({ colorDisabled }) => colorDisabled};

    svg path {
      fill: ${({ colorDisabled }) => colorDisabled};
    }
  }

  :hover {
    background: ${({ bgHover }) => bgHover};
    color: ${({ colorHover }) => colorHover};
    cursor: pointer;
    svg path {
      fill: ${({ colorHover }) => colorHover};
    }
  }
`;
