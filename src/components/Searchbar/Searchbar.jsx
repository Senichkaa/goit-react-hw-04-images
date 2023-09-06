import { Component } from 'react';
import {
  SearchbarForm,
  SearchFormField,
  Label,
  SearchHeader,
  SearchButton,
} from './Searchbar.styled';
import { RiUserSearchLine } from 'react-icons/ri';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return alert('Enter a valid search query!');
    }
    this.props.onSubmit(this.state.query);
    this.setState({
      query: '',
    });
  };

  handleInput = event => {
    this.setState({ query: event.target.value.toLowerCase() });
  };

  render() {
    return (
      <SearchHeader className="searchbar">
        <SearchbarForm className="form" onSubmit={this.handleSubmit}>
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
            value={this.state.query}
            onChange={this.handleInput}
          />
        </SearchbarForm>
      </SearchHeader>
    );
  }
}
