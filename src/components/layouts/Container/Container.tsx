import { ReactNode } from 'react';

import styled from 'styled-components';

interface IContainer {
  children: ReactNode;
}

export const Container = ({ children }: IContainer) => <ContainerStyled>{children}</ContainerStyled>;

const ContainerStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 0 0 290px;
  box-sizing: border-box;
`;
