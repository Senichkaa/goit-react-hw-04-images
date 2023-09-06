import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from 'components/ImageGallery/ImageGallery.styled';
export const ImageGalleryItem = ({ item, onImageClick }) => {
  const { webformatURL, tags } = item;

  const handleModalClick = () => {
    // console.log('handleModalClick');
    onImageClick(item);
  };

  return (
    <ImageGalleryItemLi className="gallery-item">
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        loading="lazy"
        onClick={handleModalClick}
      />
    </ImageGalleryItemLi>
  );
};
