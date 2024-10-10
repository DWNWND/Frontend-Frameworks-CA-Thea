import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./Home.module.css";
import BannerCommercial from "../../components/BannerCommercial";
import ProductsToDisplay from "../../components/Products/ProductLists";
import Categories from "../../components/Categories";

export function Home() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Lazz | Shop Flash Sale!</title>
      </Helmet>
      <main className={styles.wrapper}>
        <BannerCommercial />
        <Categories />
        <ProductsToDisplay />
      </main>
    </HelmetProvider>
  );
}
