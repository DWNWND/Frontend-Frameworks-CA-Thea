import styles from "./SimilarProducts.module.css";
import ProductsToDisplay from "../../ProductLists/index.jsx";

export default function SimilarProducts({ tag }) {
  return (
    <div>
      <div className={`${styles.infoHeader} ${styles.similarProductsHeader}`}>
        <h2>Similar products</h2>
      </div>
      <ProductsToDisplay tag={tag} />
    </div>
  );
}
