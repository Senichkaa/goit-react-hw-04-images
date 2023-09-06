import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './fetch-api.js';
import { Button } from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    gallery: [],
    page: 0,
    error: null,
    loading: false,
    totalPages: 1,
    showModal: false,
    largeImageURL: null,
    tags: null,
    totalImages: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.setState({ loading: true });
      fetchImages(this.state.query, this.state.page)
        .then(({ hits }) =>
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...hits],
          }))
        )
        .catch(error => this.setState({ error }))
        .finally(loading => this.setState({ loading: false }));
    }

    if (this.state.query !== prevState.query) {
      this.setState({ loading: true });
      fetchImages(this.state.query, this.state.page)
        .then(({ hits, totalHits }) =>
          this.setState({ gallery: hits, totalImages: totalHits })
        )
        .catch(error => this.setState({ error }))
        .finally(loading => this.setState({ loading: false }));
    }
  }

  handleSubmitSearch = query => {
    this.setState({ query, gallery: [], page: 1 });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = ({ largeImageURL, tags }) => {
    this.setState(({ showModal }) => ({
      showModal: !this.state.showModal,
      largeImageURL,
      tags,
    }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmitSearch} />
        {!this.state.loading && this.state.error && (
          <h1>Hold on! Something went wrong. Reboot a page, please.</h1>
        )}
        {this.state.loading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
        {this.state.gallery.length > 0 && (
          <ImageGallery
            gallery={this.state.gallery}
            onImageClick={this.toggleModal}
          />
        )}
        {this.state.gallery.length !== 0 &&
          this.state.page < Math.ceil(this.state.totalImages / 12) && (
            <Button handleLoadMoreClick={this.handleLoadMoreClick} />
          )}

        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            tags={this.state.tags}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}
