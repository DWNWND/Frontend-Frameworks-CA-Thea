import { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import Button from "../button";
import Quantity from "../quanity";
import SumTotal from "../sumTotal";

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
          <Quantity />
          <Button page={page} />
        </footer>
      );
    }
    if (page === "checkout") {
      return (
        <footer className={styles.wrapper}>
          <SumTotal total="placeholder" />
          <Button page={page} />
        </footer>
      );
    }
    if (page === "success") {
      return (
        <footer className={styles.wrapper}>
          <Button page={page} />
        </footer>
      );
    }
    if (page === "contact") {
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
