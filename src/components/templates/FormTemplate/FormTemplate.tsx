import { ReactNode } from 'react';
import styled from 'styled-components';

import { ColorService } from '../../../services/ColorService';
import { Footer } from '../../atoms/Footer/Footer';
import { Container } from '../../layouts/Container/Container';
import { Header } from '../../molecules/Header/Header';
import { Menu } from '../../molecules/Menu/Menu';
import { Title } from './Title';

interface IFormTemplate {
  children: ReactNode;
  title: string;
}

export const FormTemplate = ({ children, title }: IFormTemplate) => (
  <Wrapper>
    <Menu />
    <Header />
    <Container>
      <Content>
        <FormContent>{children}</FormContent>
      </Content>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  background: ${ColorService.BLACK};
  width: 100%;
  padding: 0;
`;

const Content = styled.div`
  padding: 40px 0;
`;

const FormContent = styled.div``;

const Head = styled.div`
  text-align: left;
  padding: 72px 0;
`;

// const Title = styled.p`
//   font-family: ${getFontFamily('bold')};
//   font-size: 56px;
//   line-height: 80px;
//   color: ${ColorService.SECONDARY};
// `;

const Link = styled.a`
  font-size: 16px;
  line-height: 24px;
  color: ${ColorService.SECONDARY};
`;
