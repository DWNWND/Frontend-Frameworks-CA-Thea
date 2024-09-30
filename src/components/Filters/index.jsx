import { useContext } from "react";
import styles from "./Filters.module.css";
import { FilterContext } from "../ProductCards";

export default function Filters({ page }) {
  const { filters, setFilters } = useContext(FilterContext);

  return (
    <div id="filters" className={styles.wrapper}>
      <button className={`${filters == "topSales" ? styles.current : styles.notSelected} ${styles.filter}`} id="TopSales" onClick={() => setFilters("topSales")}>
        Top sales
      </button>
      <button className={`${filters == "discountedItems" ? styles.current : styles.notSelected} ${styles.filter}`} id="DiscountedItems" onClick={() => setFilters("discountedItems")}>
        Discounted items
      </button>
    </div>
  );
}
