import calcPercentage from "../../js/calculateDiscount.js";
import styles from "./Price.module.css";

export default function Price({ originalPrice, discountedPrice, page, view }) {
  const discount = calcPercentage(discountedPrice, originalPrice);

  if (discountedPrice !== originalPrice) {
    return (
      <div>
        <div className={`${styles.wrapper} ${view == "listView" && styles.listView} ${view == "productSpesificView" && styles.productSpesificView}`}>
          <p className={styles.discounted}>kr {discountedPrice}</p>
          <p className={styles.percentage}>- {discount}%</p>
        </div>
        {page.includes("/product/") && <p className={styles.oldPrice}>kr {originalPrice}</p>}
      </div>
    );
  }
  if (discountedPrice === originalPrice) {
    return (
      <>
        <div className={`${styles.wrapper} ${view == "listView" && styles.listView} ${view == "productSpesificView" && styles.productSpesificView}`}>
          <p className={styles.original}>kr {originalPrice}</p>
        </div>
      </>
    );
  }
}
