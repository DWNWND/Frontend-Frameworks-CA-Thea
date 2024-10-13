import styles from "./Search.module.css";
import SearchIcon from "../../../../assets/icons/search.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Searchbar({ products = [] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <form className={styles.searchForm} id="searchForm">
        <input className={styles.searchInput} id="searchInput" type="search" placeholder="Search..." aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.trim())} />
        <button className={styles.searchBtn}value="search button" id="searchButton" type="submit" aria-label="Search">
          <img src={SearchIcon} alt="Search icon" />
        </button>
      </form>
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
