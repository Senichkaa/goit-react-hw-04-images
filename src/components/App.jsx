import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './fetch-api.js';
import { Button } from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);

  // state = {
  //   query: '',
  //   gallery: [],
  //   page: 0,
  //   error: null,
  //   loading: false,
  //   totalPages: 1,
  //   showModal: false,
  //   largeImageURL: null,
  //   tags: null,
  //   totalImages: null,
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.state.page !== prevState.page ||
  //     this.state.query !== prevState.query
  //   ) {
  //     this.setState({ loading: true });
  //     fetchImages(this.state.query, this.state.page)
  //       .then(({ hits }) =>
  //         this.setState(prevState => ({
  //           gallery: [...prevState.gallery, ...hits],
  //         }))
  //       )
  //       .catch(error => this.setState({ error }))
  //       .finally(loading => this.setState({ loading: false }));
  //   }

  //   if (this.state.query !== prevState.query) {
  //     this.setState({ loading: true });
  //     fetchImages(this.state.query, this.state.page)
  //       .then(({ hits, totalHits }) =>
  //         this.setState({ gallery: hits, totalImages: totalHits })
  //       )
  //       .catch(error => this.setState({ error }))
  //       .finally(loading => this.setState({ loading: false }));
  //   }
  // }

  useEffect(() => {
    if (query !== '') {
      setLoading(true);

      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            return;
          } else {
            setGallery(prev => [...prev, ...hits]);
            setTotalImages(totalHits);
          }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [page, query]);

  const handleSubmitSearch = query => {
    setQuery(query);
    setPage(1);
    setGallery([]);
  };

  const handleLoadMoreClick = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = ({ tags, largeImageURL }) => {
    setShowModal(!showModal);
    setTags(tags);
    setLargeImageURL(largeImageURL);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmitSearch} />
      {!loading && error && (
        <h1>Hold on! Something went wrong. Reboot a page, please.</h1>
      )}
      {loading && (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      )}
      {gallery.length > 0 && (
        <ImageGallery gallery={gallery} onImageClick={toggleModal} />
      )}
      {gallery.length !== 0 && page < Math.ceil(totalImages / 12) && (
        <Button handleLoadMoreClick={handleLoadMoreClick} />
      )}
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
    </>
  );
};
