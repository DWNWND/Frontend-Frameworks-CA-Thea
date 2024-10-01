import { ProductsToDisplay } from "../../ProductCards";
import Categories from "../../Categories";
import BannerCommercial from "../../BannerCommercial";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <BannerCommercial />
      <Categories />
      <ProductsToDisplay />
    </div>
  );
}
