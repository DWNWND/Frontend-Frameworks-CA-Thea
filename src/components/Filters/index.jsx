import { useOutletContext } from "react-router-dom";
import styles from "./Filters.module.css";

export function Filters() {
  const { filters, setFilters } = useOutletContext();

  return (
    <div id="filters" className={styles.container}>
      <button className={`${filters == "topSales" ? styles.selected : styles.notSelected} ${styles.filterGeneral}`} id="TopSales" onClick={() => setFilters("topSales")}>
        Top sales
      </button>
      <button className={`${filters == "discountedItems" ? styles.selected : styles.notSelected} ${styles.filterGeneral}`} id="DiscountedItems" onClick={() => setFilters("discountedItems")}>
        Discounted items
      </button>
    </div>
  );
}
