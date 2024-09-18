import { Link } from "react-router-dom";
import LogoIcon from "../../../assets/logos/logo.png";
import BackArrowIcon from "../../../assets/icons/back.svg";
import Searchbar from "./Search";
import HamburgerMenu from "./Nav";
import Cart from "./Cart";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.width}>
      <div className={styles.wrapper}>
        <div className={styles.headerBackground}></div>
        <Link to="/" className={styles.icon}>
          <img src={LogoIcon} alt="Lazz logo, click to go to home page" />
        </Link>
        {/* <div className={styled.icon}>
        <img src={BackArrowIcon} alt="fill-in-later" />
      </div> */}
        <Searchbar />
        <div className={styles.icon}>
          <Cart />
        </div>
        <HamburgerMenu />
      </div>
    </header>
  );
}
