import { useOutletContext } from "react-router-dom";
import styles from "./Filters.module.css";

export default function Filters() {
  const { filters, setFilters } = useOutletContext();

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
