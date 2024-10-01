import { Link } from "react-router-dom";
import LogoIcon from "../../../assets/logos/logo.png";
import Searchbar from "./Search";
import HamburgerMenu from "./Nav";
import Cart from "./Cart";
import styles from "./Header.module.css";

export default function Header({ cart }) {
  function handleClick() {
    sessionStorage.removeItem("receipt");
  }
  
  return (
    <header className={styles.width}>
      <div className={styles.wrapper}>
        <div className={styles.headerBackground}></div>
        <Link to="/" className={styles.icon} onClick={() => handleClick()}>
          <img src={LogoIcon} alt="Lazz logo, click to go to home page" />
        </Link>
        <Searchbar />
        <Link to="checkout" className={styles.icon}>
          <Cart cart={cart} />
        </Link>
        <HamburgerMenu />
      </div>
    </header>
  );
}
