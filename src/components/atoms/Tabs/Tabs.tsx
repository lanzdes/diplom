import styled from 'styled-components';
import { ColorService } from '../../../services/ColorService';

interface ITab {
  title: string;
  url: string;
}

interface ITabs {
  list: ITab[];
  activeTabUrl: string;
}

export const Tabs = ({ list, activeTabUrl }: ITabs) => (
  <ListStyled>
    {list.map(({ title, url }) => (
      <Li key={url}>
        <Link active={url === activeTabUrl}>{title}</Link>
      </Li>
    ))}
  </ListStyled>
);

const ListStyled = styled.ul`
  color: ${ColorService.WHITE};
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: flex-start;
  border-bottom: 1px solid ${ColorService.GRAPHITE};
`;

const Li = styled.li``;

const Link = styled.a<{ active: boolean }>`
  position: relative;
  top: 1px;
  font-size: 16px;
  line-height: 24px;
  color: ${ColorService.SECONDARY};
  padding: 0 20px 24px;
  display: block;
  border-bottom: ${({ active }) => `1px solid  ${active ? ColorService.SECONDARY : ColorService.TRANSPARENT}`}; ;
`;
