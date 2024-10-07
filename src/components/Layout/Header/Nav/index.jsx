import { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "./Nav.module.css";

const Nav = styled.nav`
  background-color: white;
  position: fixed;
  top: 65px;
  left: 0;
  width: 100%;
  z-index: 99;
  transition: all 0.7s ease-in-out;
`;

const HamburgerMenuBtn = styled.button`
  background-color: white;
  border: none;
  padding: 0 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 24px;
  z-index: 100;
`;

const OpenMenuContext = createContext();

export default function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onHamburgerMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <OpenMenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
        <HamburgerMenuBtn onClick={() => onHamburgerMenuClick()}>
          <div className={isMenuOpen ? "burger burger-squeeze open" : "burger burger-squeeze"}>
            <div className="burger-lines"></div>
          </div>
        </HamburgerMenuBtn>
        <OpenMenu />
      </OpenMenuContext.Provider>
    </>
  );
}

function OpenMenu() {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);

  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <Nav className={isMenuOpen ? styles.active : styles.hidden}>
      <ul className={styles.navContainer}>
        <li>
          <Link to="/" className={styles.navLinkPages} onClick={() => handleClick()}>
            Home
          </Link>
        </li>
        <li>
          <div className={styles.navLinkPages}>Categories</div>
          <ul className={styles.navLinkCategoryList}>
            <li>
              <Link to="/products/electronics" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/products/audio" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Audio
              </Link>
            </li>
            <li>
              <Link to="/products/fashion" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Fashion
              </Link>
            </li>
            <li>
              <Link to="/products/beauty" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Beauty
              </Link>
            </li>
            <li>
              <Link to="/products/watches" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Watches
              </Link>
            </li>
            <li>
              <Link to="/products/shoes" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Shoes
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/contact" className={styles.navLinkPages} onClick={() => handleClick()}>
            Contact us
          </Link>
        </li>
        <li>
          <Link to="/support" className={styles.navLinkPages} onClick={() => handleClick()}>
            Help & support
          </Link>
        </li>
      </ul>
    </Nav>
  );
}
