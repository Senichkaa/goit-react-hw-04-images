import { ButtonLoadMore } from './Button.styled';
export const Button = ({ handleLoadMoreClick }) => {
  return (
    <>
      <ButtonLoadMore type="button" onClick={handleLoadMoreClick}>
        Load More
      </ButtonLoadMore>
    </>
  );
};
