import { useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./ProductsList.module.css";
import ProductsToDisplay from "../../components/Products/ProductLists";
import caseFirstLetter from "../../js/caseFirstLetter";

export default function ProductsList() {
  const location = useLocation();
  const slicedCategory = location.pathname.split("/")[2];
  const category = caseFirstLetter(slicedCategory);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Products | {category} | Lazz</title>
      </Helmet>
      <main className={styles.wrapper}>
        <h1>{category}</h1>
        <ProductsToDisplay />
      </main>
    </HelmetProvider>
  );
}
