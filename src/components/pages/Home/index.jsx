import { ProductsToDisplay } from "../../ProductCards";
import Categories from "../../Categories";
import BannerCommercial from "../../BannerCommercial";
import styles from "./Home.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Home() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Lazz | Shop Flash Sale!</title>
      </Helmet>
      <div className={styles.wrapper}>
        <BannerCommercial />
        <Categories />
        <ProductsToDisplay />
      </div>
    </HelmetProvider>
  );
}
