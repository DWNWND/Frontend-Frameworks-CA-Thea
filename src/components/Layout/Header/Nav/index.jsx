import { useState } from "react";
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

function OpenMenu({ isActive }) {
  return (
    <Nav className={isActive ? styles.active : styles.hidden}>
      <ul className={styles.pages}>
        <li>
          <Link to="/" className={styles.page}>
            Home
          </Link>
        </li>
        <li>
          <div className={styles.page}>
            Categories
          </div>
          <ul className={styles.categories}>
            <li>
              <Link to="/products/electronics" className={styles.category}>
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/products/audio" className={styles.category}>
                Audio
              </Link>
            </li>
            <li>
              <Link to="/products/fashion" className={styles.category}>
                Fashion
              </Link>
            </li>
            <li>
              <Link to="/products/beauty" className={styles.category}>
                Beauty
              </Link>
            </li>
            <li>
              <Link to="/products/watches" className={styles.category}>
                Watches
              </Link>
            </li>
            <li>
              <Link to="/products/shoes" className={styles.category}>
                Shoes
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/contact" className={styles.page}>
            Contact us
          </Link>
        </li>
        <li>
          <Link to="/support" className={styles.page}>
            Help & support
          </Link>
        </li>
      </ul>
    </Nav>
  );
}

export default function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onHamburgerMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <HamburgerMenuBtn onClick={() => onHamburgerMenuClick()}>
        <div className={isMenuOpen ? "burger burger-squeeze open" : "burger burger-squeeze"}>
          <div className="burger-lines"></div>
        </div>
      </HamburgerMenuBtn>
      <OpenMenu isActive={isMenuOpen} />
    </>
  );
}
