import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryImgs } from './ImageGallery.styled';
export const ImageGallery = ({ gallery, onImageClick }) => {
  return (
    <ImageGalleryImgs className="gallery">
      {gallery.map(item => {
        return (
          <ImageGalleryItem
            item={item}
            key={item.id}
            onImageClick={onImageClick}
          />
        );
      })}
    </ImageGalleryImgs>
  );
};
