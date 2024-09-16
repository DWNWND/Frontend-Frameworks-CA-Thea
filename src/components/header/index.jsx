import styled from "styled-components";
import LogoIcon from "../../images/logo.png";
import BackArrowIcon from "../../images/back.svg";
import Searchbar from "./search";
import HamburgerMenu from "./nav";
import Cart from "./cart";

const Wrapper = styled.header`
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  padding: 1rem;
  background-color: var(--color-white);
  z-index: 100;
  position: fixed;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
`;

export default function Header() {
  return (
    <Wrapper>
      <IconWrapper>
        <img src={LogoIcon} alt="Lazz logo, click to go to home page" />
      </IconWrapper>
      {/* <IconWrapper>
        <img src={BackArrowIcon} alt="fill-in-later" />
      </IconWrapper> */}
      <Searchbar />
      <IconWrapper>
        <Cart />
      </IconWrapper>
      <HamburgerMenu />
    </Wrapper>
  );
}
