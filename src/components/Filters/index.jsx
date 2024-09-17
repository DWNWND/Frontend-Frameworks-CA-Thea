import { useState } from "react";
import styles from "./Filters.module.css";

export default function Filters({ page = "/" }) {
  const [isActive, setActive] = useState("TopSales");

  const toggleClass = (event) => {
    setActive(event.target.id);
  };

  if (page === "/") {
    return (
      <div className={styles.wrapper}>
        <button className={`${isActive == "TopSales" ? styles.current : ""} ${styles.filter}`} id="TopSales" onClick={toggleClass}>
          Top sales
        </button>
        <button className={`${isActive == "DiscountedItems" ? styles.current : ""} ${styles.filter}`} id="DiscountedItems" onClick={toggleClass}>
          Discounted items
        </button>
      </div>
    );
  }
  if (page === "/products") {
    setActive("BestMatch");
    return (
      <div className={styles.wrapper}>
        <button className={`${isActive == "BestMatch" ? styles.current : ""} ${styles.filter}`} id="BestMatch" onClick={toggleClass}>
          Best match
        </button>
        <button className={`${isActive == "TopSales" ? styles.current : ""} ${styles.filter}`} id="TopSales" onClick={toggleClass}>
          Top sales
        </button>
        <button className={`${isActive == "DiscountedItems" ? styles.current : ""} ${styles.filter}`} id="DiscountedItems" onClick={toggleClass}>
          Discounted items
        </button>
      </div>
    );
  }
}
