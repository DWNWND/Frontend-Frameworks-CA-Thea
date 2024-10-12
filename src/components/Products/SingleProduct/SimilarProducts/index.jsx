import styles from "./SimilarProducts.module.css";
import { ProductList } from "../../index.jsx";

export default function SimilarProducts({ tag }) {
  return (
    <div>
      <div className={`${styles.infoHeader} ${styles.similarProductsHeader}`}>
        <h2>Similar products</h2>
      </div>
      <ProductList tag={tag} />
    </div>
  );
}
