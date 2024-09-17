import styled from "styled-components";
import SearchIcon from "../../../../images/search.svg";

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  z-index: 100;
`;

const SearchButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  padding: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 0;
  background-color: ${(props) => props.theme.colors.searchbarBackground};
  color: ${(props) => props.theme.colors.textDarkGray};
  padding-left: 0.8rem;
  width: 100%;
  font-size: 1rem;
`;

export default function Searchbar() {
  return (
    <SearchForm id="searchForm">
      <SearchInput id="searchInput" type="search" placeholder="Search..." aria-label="Search" />
      <SearchButton id="searchButton" type="submit" aria-label="Search">
        <img src={SearchIcon} alt="Search icon" />
      </SearchButton>
    </SearchForm>
  );
}
