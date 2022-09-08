import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getStoreProfile } from '../../../core/slices/authSlice';
import { ColorService } from '../../../services/ColorService';

export const Header = () => {
  const profile = useSelector(getStoreProfile);
  return (
    <HeaderStyled>
      <ProfileName>Profile name: {profile?.username}</ProfileName>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  width: calc(100% - 290px);
  top: 0;
  left: 290px;
  padding-right: 40px;
  height: 120px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  background: ${ColorService.BLACK};
  z-index: 1;
`;

const ProfileName = styled.div`
  color: ${ColorService.WHITE};
`;
