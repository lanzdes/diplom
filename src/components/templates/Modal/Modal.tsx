import styled from 'styled-components';

import { ReactComponent as ExitIcon } from './exit.svg';
import { ReactNode } from 'react';

interface IModal {
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ onClose, children }: IModal) => {
  return (
    <>
      <OverLay>
        <ModalWrap>
          <StyledButton onClick={onClose}>
            <ExitIcon />
          </StyledButton>
          <Content>{children}</Content>
        </ModalWrap>
      </OverLay>
    </>
  );
};

export const OverLay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: ${(props: any) => (props.hidden ? 'none' : 'initial')};
`;

export const ModalWrap = styled.div`
  margin: 120px auto;
  padding: 50px;
  background: white;
  border: 1px solid #666;
  width: 80vw;
  height: 80vh;
  border-radius: 6px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  background: none;
  border: none;
`;

const Content = styled.div`
  padding-top: 20px;
  height: 100%;
`;
