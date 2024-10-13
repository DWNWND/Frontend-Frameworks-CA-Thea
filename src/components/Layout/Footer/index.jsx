import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { SumTotal, Button } from "../../index.jsx";
import VisaLogo from "../../../assets/logos/logos_visa.png";
import KlarnaLogo from "../../../assets/logos/logos_klarna.png";
import MastercardLogo from "../../../assets/logos/logos_mastercard.png";
import PaypalLogo from "../../../assets/logos/logos_paypal.png";
import useScreenSizeCheck from "../../../hooks/useScreenSizeCheck.jsx";

function CopyRight() {
  return (
    <div className={styles.copyRight}>
      <p>&copy; 2024 Thea Oland</p>
    </div>
  );
}

export default function Footer({ page, product, totalSum, setTotalSum }) {
  const isMobile = useScreenSizeCheck();

  function DesktopFooter() {
    return (
      <footer className={styles.footerBackground}>
        <div className={styles.containerDesktop}>
          <div className={styles.desktopFooterColumn}>
            <h3>Customer care</h3>
            <ul className={styles.navLinkLists}>
              <li>
                <Link to="/support" className={styles.navLinks}>
                  Help & support
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.navLinks}>
                  How to buy
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.navLinks}>
                  How to return
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.navLinks}>
                  Shipping & delivery
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.navLinks}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.desktopFooterColumn}>
            <h3>Lazz</h3>
            <ul className={styles.navLinkLists}>
              <li>
                <Link to="/contact" className={styles.navLinks}>
                  About LAZZ
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.navLinks}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/support" className={styles.navLinks}>
                  Terms & conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.navLinks}>
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.desktopFooterColumn}>
            <h3>Payment options</h3>
            <div className={styles.paymentOptions}>
              <img src={VisaLogo} alt="Visa logo, to show that you can pay with visa"></img>
              <img src={MastercardLogo} alt="Mastercard logo, to show that you can pay with Mastercard"></img>
              <img src={KlarnaLogo} alt="Klarna logo, to show that you can pay with Klarna"></img>
              <img src={PaypalLogo} alt="Paypal logo, to show that you can pay with Paypal"></img>
            </div>
          </div>
        </div>
        <CopyRight />
      </footer>
    );
  }

  function MobileFooter() {
    if (page.includes("/product/")) {
      return (
        <footer className={`${styles.containerMobile} ${styles.footerBackground}`}>
          <Button page={page} product={product} />
        </footer>
      );
    }
    if (page.includes("/checkout")) {
      return (
        <footer className={`${styles.containerMobile} ${styles.footerBackground}`}>
          <div className={styles.wrapper}>
            <SumTotal totalSum={totalSum} setTotalSum={setTotalSum} />
            <Button page={page} />
          </div>
          <CopyRight />
        </footer>
      );
    }
    if (page.includes("/success")) {
      return (
        <footer className={`${styles.containerMobile} ${styles.footerBackground}`}>
          <Button page={page} />
        </footer>
      );
    }
    if (page.includes("/contact")) {
      return (
        <footer className={`${styles.containerMobile} ${styles.footerBackground}`}>
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
