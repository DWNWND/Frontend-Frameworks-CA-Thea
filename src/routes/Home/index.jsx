import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./Home.module.css";
import { BannerCommercial, Categories } from "../../components";
import { ProductList } from "../../components/Products/index.jsx";

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
        <ProductList />
      </main>
    </HelmetProvider>
  );
}
