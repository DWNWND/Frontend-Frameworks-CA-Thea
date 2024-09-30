import { ProductsToDisplay } from "../../ProductCards";
import Categories from "../../Categories";
import BrandCommercial from "../../BrandCommercial";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <BrandCommercial />
      <Categories />
      <ProductsToDisplay />
    </div>
  );
}
