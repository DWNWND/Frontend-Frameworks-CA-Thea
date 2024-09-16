import styled from "styled-components";
import LogoIcon from "../../images/logo.png";
import BackArrowIcon from "../../images/back.svg";
import Searchbar from "./search";
import HamburgerMenu from "./nav";
import Cart from "./cart";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styled.icon}>
        <img src={LogoIcon} alt="Lazz logo, click to go to home page" />
      </div>
      {/* <div className={styled.icon}>
        <img src={BackArrowIcon} alt="fill-in-later" />
      </div> */}
      <Searchbar />
      <div className={styled.icon}>
        <Cart />
      </div>
      <HamburgerMenu />
    </header>
  );
}
