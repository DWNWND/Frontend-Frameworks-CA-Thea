import { Helmet, HelmetProvider } from "react-helmet-async";
import { BannerCommercial, Categories, ProductList } from "../../components";
import styles from "./Home.module.css";

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
