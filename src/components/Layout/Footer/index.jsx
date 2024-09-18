import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import Quantity from "../../Quanity";
import SumTotal from "../../SumTotal";
import Button from "../../button";
import VisaLogo from "../../../assets/logos/logos_visa.png";
import KlarnaLogo from "../../../assets/logos/logos_klarna.png";
import MastercardLogo from "../../../assets/logos/logos_mastercard.png";
import PaypalLogo from "../../../assets/logos/logos_paypal.png";

export default function Footer({ page }) {
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
      <footer className={styles.width}>
        <div className={styles.wrapper}>
          <div className={styles.footerContainers}>
            <h3>Customer care</h3>
            <ul>
              <li>
                <Link to="/support" className={styles.link}>
                  Help & support
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.link}>
                  How to buy
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.link}>
                  How to return
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.link}>
                  Shipping & delivery
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.link}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerContainers}>
            <h3>Lazz</h3>
            <ul>
              <li>
                <Link to="/contact" className={styles.link}>
                  About LAZZ
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.link}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.link}>
                  Terms & conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.link}>
                  Contact us
                </Link>
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
        </div>
      </footer>
    );
  } // the desktop footer is empty for now

  function MobileFooter() {
    if (page.includes("/product/")) {
      return (
        <footer className={`${styles.wrapper} ${styles.width}`}>
          <Quantity />
          <Button page={page} />
        </footer>
      );
    }
    if (page.includes("/checkout")) {
      return (
        <footer className={`${styles.wrapper} ${styles.width}`}>
          <SumTotal total="placeholder" />
          <Button page={page} />
        </footer>
      );
    }
    if (page.includes("/success")) {
      return (
        <footer className={`${styles.wrapper} ${styles.width}`}>
          <Button page={page} />
        </footer>
      );
    }
    if (page.includes("/contact")) {
      return (
        <footer className={`${styles.wrapper} ${styles.width}`}>
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
