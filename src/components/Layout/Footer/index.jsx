import { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import Button from "../../Button";
import Quantity from "../../Quanity";
import SumTotal from "../../SumTotal";
import VisaLogo from "../../../images/logos_visa.png";
import KlarnaLogo from "../../../images/logos_klarna.png";
import MastercardLogo from "../../../images/logos_mastercard.png";
import PaypalLogo from "../../../images/logos_paypal.png";

export default function Footer({ page = "checkout" }) {
  console.log(page);

  //add link to source here
  const checkIfMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }, []);

    return width <= 768;
  };

  const isMobile = checkIfMobileScreen();

  function DesktopFooter() {
    return (
      <footer className={styles.wrapper}>
        <div className={styles.footerContainers}>
          <h3>Customer care</h3>
          <ul>
            <li>
              <a>Help & support</a>
            </li>
            <li>
              <a>How to buy</a>
            </li>
            <li>
              <a>How to return</a>
            </li>
            <li>
              <a>Shipping & delivery</a>
            </li>
            <li>
              <a>FAQ</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerContainers}>
          <h3>Lazz</h3>
          <ul>
            <li>
              <a>About LAZZ</a>
            </li>
            <li>
              <a>Privacy policy</a>
            </li>
            <li>
              <a>Terms & conditions</a>
            </li>
            <li>
              <a>Contact us</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerContainers}>
          <h3>Payment options</h3>
          <div className={styles.paymentContainer}>
            <img src={VisaLogo} alt="Visa logo, to show that you can pay with visa"></img>
            <img src={MastercardLogo} alt="Mastercard logo, to show that you can pay with Mastercard"></img>
            <img src={KlarnaLogo} alt="Klarna logo, to show that you can pay with Klarna"></img>
            <img src={PaypalLogo} alt="Paypal logo, to show that you can pay with Paypal"></img>
          </div>
        </div>
      </footer>
    );
  } // the desktop footer is empty for now

  function MobileFooter() {
    if (page === "/product") {
      return (
        <footer className={styles.wrapper}>
          <Quantity />
          <Button page={page} />
        </footer>
      );
    }
    if (page === "/checkout") {
      return (
        <footer className={styles.wrapper}>
          <SumTotal total="placeholder" />
          <Button page={page} />
        </footer>
      );
    }
    if (page === "/success") {
      return (
        <footer className={styles.wrapper}>
          <Button page={page} />
        </footer>
      );
    }
    if (page === "/contact") {
      return (
        <footer className={styles.wrapper}>
          <Button page={page} />
        </footer>
      );
    } else {
      return <></>;
    }
  }
  if (isMobile) {
    return <MobileFooter />;
  } else if (!isMobile) {
    return <DesktopFooter />;
  }
}
