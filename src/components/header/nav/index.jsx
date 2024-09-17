import { useState } from "react";
import styled from "styled-components";
import styles from "./Nav.module.css";

const Nav = styled.nav`
  background-color: white;
  position: absolute;
  top: 65.59px;
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
          <a href="#" className={styles.page}>
            Home
          </a>
        </li>
        <li>
          <a href="#" className={styles.page}>
            Categories
          </a>
          <ul className={styles.categories}>
            <li>
              <a href="#" className={styles.category}>
                Electronics
              </a>
            </li>
            <li>
              <a href="#" className={styles.category}>
                Audio
              </a>
            </li>
            <li>
              <a href="#" className={styles.category}>
                Fashion
              </a>
            </li>
            <li>
              <a href="#" className={styles.category}>
                Beauty
              </a>
            </li>
            <li>
              <a href="#" className={styles.category}>
                Watches
              </a>
            </li>
            <li>
              <a href="#" className={styles.category}>
                Shoes
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" className={styles.page}>
            Contact us
          </a>
        </li>
        <li>
          <a href="#" className={styles.page}>
            Help & support
          </a>
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
