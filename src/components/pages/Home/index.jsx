import ProductCards from "../../ProductCards";
import Categories from "./Categories";
import BrandCommercial from "./BrandCommercial";
import Filters from "../../Filters";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <BrandCommercial/>
      <Categories/>
      <Filters />
      <ProductCards />
    </div>
  );
}
