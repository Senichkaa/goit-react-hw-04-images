import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalElement } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      const { largeImageURL, tags } = this.props;
      this.props.onClose({ largeImageURL, tags });
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      const { largeImageURL, tags } = this.props;
      this.props.onClose({ largeImageURL, tags });
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    return createPortal(
      <ModalOverlay className="overlay" onClick={this.handleBackdropClick}>
        <ModalElement className="modal">
          <img src={this.props.largeImageURL} alt={this.props.tags} />
        </ModalElement>
      </ModalOverlay>,
      modalRoot
    );
  }
}
