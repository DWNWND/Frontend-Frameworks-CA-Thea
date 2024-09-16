import { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import Button from "../button";

export default function Footer({ page = "checkout" }) {
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
    return <footer className={styles.wrapper}></footer>;
  } // the desktop footer is empty for now

  function MobileFooter() {
    if (page === "product") {
      return (
        <footer className={styles.wrapper}>
          <Button page={page} />
        </footer>
      );
    }
    if (page === "checkout") {
      return (
        <footer className={styles.wrapper}>
          <Button page={page} />
        </footer>
      );
    }
    if (page === "checkout-success") {
      return (
        <footer className={styles.wrapper}>
          <Button page={page} />
        </footer>
      );
    }
    if (page === "send-inquiry") {
      return (
        <footer className={styles.wrapper}>
          <Button page={page} />
        </footer>
      );
    }
  }
  if (isMobile) {
    return <MobileFooter />;
  } else if (!isMobile) {
    return <DesktopFooter />;
  }
}
