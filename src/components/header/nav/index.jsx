import { useState } from "react";
import styled from "styled-components";
// import HamburgerMenuIcon from "../../../images/menu.svg";
// import CrossIcon from "../../../images/cross.svg";

const Nav = styled.nav`
  background-color: white;
  position: absolute;
  top: 65.59px;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.5s ease;
`;

const HamburgerMenuBtn = styled.button`
  background-color: white;
  border: none;
  padding: 0 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 24px;
`;

function OpenMenu({ isActive }) {
  return (
    <Nav className={isActive ? "active" : "hidden"}>
      <ul className="main-nav-ul">
        <li>
          <a href="#" className="main-nav-a">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="main-nav-a">
            Categories
          </a>
          <ul className="sub-nav-ul">
            <li>
              <a href="#">Electronics</a>
            </li>
            <li>
              <a href="#">Audio</a>
            </li>
            <li>
              <a href="#">Fashion</a>
            </li>
            <li>
              <a href="#">Beauty</a>
            </li>
            <li>
              <a href="#">Watches</a>
            </li>
            <li>
              <a href="#">Shoes</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" className="main-nav-a">
            Contact us
          </a>
        </li>
        <li>
          <a href="#" className="main-nav-a">
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
        {/* <img onClick={() => onHamburgerMenuClick()} src={isMenuOpen ? CrossIcon : HamburgerMenuIcon} alt="Menu icon" className="menu-transition" /> */}
        <div className={isMenuOpen ? "burger burger-squeeze open" : "burger burger-squeeze"}>
          <div className="burger-lines"></div>
        </div>
      </HamburgerMenuBtn>
      <OpenMenu isActive={isMenuOpen} />
    </>
  );
}
