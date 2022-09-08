import styled from 'styled-components';
import { ColorService } from '../../../services/ColorService';

export const Footer = () => (
  <FooterStyled>
    <FooterText>©2022 Blogfolio</FooterText>
    <FooterText>All rights reserved</FooterText>
  </FooterStyled>
);

const FooterStyled = styled.footer`
  background: ${ColorService.LIGHT};
  width: 100%;
  display: flex;
  padding: 34px;
  justify-content: space-between;
`;

const FooterText = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: ${ColorService.GRAPHITE};
`;
