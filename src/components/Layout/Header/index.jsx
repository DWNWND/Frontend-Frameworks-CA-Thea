import { Link } from "react-router-dom";
import LogoIcon from "../../../assets/logos/logo.png";
import Searchbar from "./Search";
import HamburgerMenu from "./Nav";
import Cart from "./Cart";
import styles from "./Header.module.css";

export default function Header({ products }) {
  function handleClick() {
    sessionStorage.removeItem("receipt");
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerBackground}></div>
        <Link to="/" className={styles.icons} onClick={() => handleClick()}>
          <img src={LogoIcon} className={styles.logoImg} alt="Lazz logo, click to go to home page" />
        </Link>
        <Searchbar products={products} />
        <Link to="checkout" className={styles.icons}>
          <Cart />
        </Link>
        <HamburgerMenu />
      </div>
    </header>
  );
}
