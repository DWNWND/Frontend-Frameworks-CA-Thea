import { ProductsToDisplay } from "../../ProductCards";
import styles from "./ProductsList.module.css";

export default function ProductsList() {
  return (
    <div className={styles.wrapper}>
      <ProductsToDisplay />
    </div>
  );
}
