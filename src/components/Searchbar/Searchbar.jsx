import { useState } from 'react';
import {
  SearchbarForm,
  SearchFormField,
  Label,
  SearchHeader,
  SearchButton,
} from './Searchbar.styled';
import { RiUserSearchLine } from 'react-icons/ri';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  // state = {
  //   query: '',
  // };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return alert('Enter a valid search query!');
    }
    onSubmit(query);
    setQuery('');
  };

  const handleInput = event => {
    setQuery(event.target.value.toLowerCase());
  };

  return (
    <SearchHeader className="searchbar">
      <SearchbarForm className="form" onSubmit={handleSubmit}>
        <SearchButton type="submit" className="button">
          <Label className="button-label">
            <RiUserSearchLine size={28} />
          </Label>
        </SearchButton>

        <SearchFormField
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInput}
        />
      </SearchbarForm>
    </SearchHeader>
  );
};
