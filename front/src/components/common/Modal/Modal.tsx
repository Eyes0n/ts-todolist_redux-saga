import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export interface IModal {
  onClose: () => void;
  visible: boolean;
  children?: React.ReactNode;
}

interface ModalVisibleProps {
  visible: boolean;
}

const Modal: React.FC<IModal> = ({ visible, children, onClose }) => {
  const onMaskClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const portalTarget = document.getElementById('modal-root');
  return portalTarget
    ? createPortal(
        <>
          <ModalOverlay visible={visible} />
          <ModalContainer visible={visible} onClick={onMaskClick}>
            <ModalInner>
              <CloseButton onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
              </CloseButton>
              {children}
            </ModalInner>
          </ModalContainer>
        </>,
        portalTarget,
      )
    : null;
};

const ModalContainer = styled.div<ModalVisibleProps>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div<ModalVisibleProps>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const ModalInner = styled.div`
  display: inline-block;
  box-sizing: border-box;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0;
  border: none;
  background: none;
  &:hover {
    color: red;
  }
`;

export default Modal;
