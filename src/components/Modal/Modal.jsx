import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalElement } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, tags, largeImageURL }) => {
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }
  return createPortal(
    <ModalOverlay className="overlay" onClick={handleBackdropClick}>
      <ModalElement className="modal">
        <img src={largeImageURL} alt={tags} />
      </ModalElement>
    </ModalOverlay>,
    modalRoot
  );
};
