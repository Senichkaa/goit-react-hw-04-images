import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalElement } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, tags, largeImageURL }) => {
  const handleBackdropClick = event => {
    onClose(tags, largeImageURL);
  };
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose(tags, largeImageURL);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, tags, largeImageURL]);
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
