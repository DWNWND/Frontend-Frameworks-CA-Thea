import styled from "styled-components";
import styles from "./Search.module.css";
import SearchIcon from "../../../../assets/icons/search.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

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

export default function Searchbar({ products = [] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <SearchForm id="searchForm">
        <SearchInput id="searchInput" type="search" placeholder="Search..." aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.trim())} />
        <SearchButton id="searchButton" type="submit" aria-label="Search">
          <img src={SearchIcon} alt="Search icon" />
        </SearchButton>
      </SearchForm>
      {filteredProducts.length > 0 && searchQuery.length > 0 && (
        <ul className={styles.searchResults}>
          {filteredProducts.map((product) => {
            return (
              <li key={product.id} className={styles.listItem}>
                <Link to={`/product/${product.id}`} onClick={() => setSearchQuery("")}>
                  {product.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
