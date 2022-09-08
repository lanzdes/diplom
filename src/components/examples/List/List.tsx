import styled from 'styled-components';
import { ColorService } from '../../../services/ColorService';

interface IUser {
  id: number;
  name: string;
}

interface IList {
  list: IUser[];
}

export const List = ({ list }: IList) => (
  <ListStyled>
    {list.map(({ id, name }) => (
      <Li key={id}>{name}</Li>
    ))}
  </ListStyled>
);

const ListStyled = styled.ul`
  color: ${ColorService.WHITE};
`;

const Li = styled.li``;
