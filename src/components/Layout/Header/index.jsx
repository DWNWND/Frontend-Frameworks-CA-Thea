import styled from "styled-components";
import LogoIcon from "../../../images/logo.png";
import BackArrowIcon from "../../../images/back.svg";
import Searchbar from "./Search";
import HamburgerMenu from "./Nav";
import Cart from "./Cart";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.headerBackground}></div>
      <div className={styles.icon}>
        <img src={LogoIcon} alt="Lazz logo, click to go to home page" />
      </div>
      {/* <div className={styled.icon}>
        <img src={BackArrowIcon} alt="fill-in-later" />
      </div> */}
      <Searchbar />
      <div className={styles.icon}>
        <Cart />
      </div>
      <HamburgerMenu />
    </header>
  );
}
