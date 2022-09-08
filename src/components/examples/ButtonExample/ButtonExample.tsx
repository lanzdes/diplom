import { ReactNode } from 'react';
import styled from 'styled-components';

import { ColorService } from '../../../services/ColorService';
// export { default as recommendPhone } from '../favoritesIcon.svg';
import { ReactComponent as Logo } from './favoritesIcon.svg';

interface IBannerJob {
  text: string;
  disabled?: boolean;
  valid?: boolean;
  onClick: () => void;
  icon?: ReactNode;
}

export const ButtonExample = ({ text, disabled, valid, onClick, icon }: IBannerJob) => (
  <Button onClick={onClick} disabled={disabled} valid={valid}>
    {/* // <img src={logo} style={{ fill: '#000' }} /> */}
    <Logo />
    {icon}
    {text}
  </Button>
);

const Button = styled.button<{ valid?: boolean }>`
  padding: 13px 144px;
  color: ${ColorService.WHITE};
  background: #007bff;
  border: 4px solid #0077f7;
  border-radius: 200px;

  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
  letter-spacing: 0.05em;
  color: ${(props) => (props.valid ? 'red' : 'green')};

  :disabled {
    background: #ccd5dd;
    color: #254050;
  }
  :hover {
    background: red;
  }
`;

const LogoStyled = styled(Logo)`
  path {
    fill: red;
  }
`;
