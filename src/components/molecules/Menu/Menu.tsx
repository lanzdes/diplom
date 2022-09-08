import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getStoreProfile } from '../../../core/slices/authSlice';

import { ColorService } from '../../../services/ColorService';

export const Menu = () => {
  const location = useLocation();

  const profile = useSelector(getStoreProfile);
  return (
    <MenuStyled>
      <a href="/">
        <img src="logo.svg" alt="logo" />
      </a>
      <NavStyled>
        {profile ? (
          <>
            <LinkStyled active={Boolean(location.pathname === '/')}>
              <Link to="/">
                <i className="bi bi-house-door"></i>Home
              </Link>
            </LinkStyled>
            <LinkStyled active={Boolean(location.pathname === '/trends')}>
              <Link to="/trends">
                <i className="bi bi-fire"></i>Trends
              </Link>
            </LinkStyled>
            <LinkStyled active={Boolean(location.pathname === '/favorites')}>
              <Link to="/favorites">
                <i className="bi bi-bookmark-fill"></i>Favorites
              </Link>
            </LinkStyled>
            <LinkStyled active={Boolean(location.pathname === '/settings')}>
              <Link to="/settings">
                <i className="bi bi-gear-fill"></i>Settings
              </Link>
            </LinkStyled>
          </>
        ) : (
          <>
            <LinkStyled active={Boolean(location.pathname === '/')}>
              <Link to="/">
                <i className="bi bi-house-door"></i>Home
              </Link>
            </LinkStyled>
            <LinkStyled active={Boolean(location.pathname === '/trends')}>
              <Link to="/trends">
                <i className="bi bi-fire"></i>Trends
              </Link>
            </LinkStyled>
          </>
        )}
      </NavStyled>
      <p>© All Rights Reserved</p>
    </MenuStyled>
  );
};

const MenuStyled = styled.div`
  position: fixed;
  width: 290px;
  height: 100vh;
  padding: 40px 60px 64px;
  display: flex;
  flex-direction: column;
  color: ${ColorService.SECONDARY};
`;

const NavStyled = styled.nav`
  color: ${ColorService.SECONDARY};
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  flex-grow: 1;
`;

const LinkStyled = styled.div<{ active: boolean }>`
  a {
    display: block;
    color: ${ColorService.SECONDARY};
    padding: 20px 0;
    color: ${({ active }) => ` ${active ? ColorService.PRIMARY : ColorService.SECONDARY}`};
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
  }
  i {
    margin-right: 23px;
  }
`;
