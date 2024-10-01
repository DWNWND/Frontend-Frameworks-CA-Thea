import { ProductsToDisplay } from "../../ProductCards";
import styles from "./ProductsList.module.css";
import { useLocation } from "react-router-dom";

export default function ProductsList() {
  const location = useLocation();
  const category = location.pathname.split("/")[2];

  return (
    <div className={styles.wrapper}>
      <h1>{category}</h1>
      <ProductsToDisplay />
    </div>
  );
}
