import calcPercentage from "../../calculateDiscount.js";
import styles from "./Price.module.css";

export default function Price({ originalPrice, discountedPrice, page }) {
  const discount = calcPercentage(discountedPrice, originalPrice);

  if (discountedPrice !== originalPrice) {
    return (
      <div>
        <div className={styles.wrapper}>
          <p className={`${styles.discounted} ${page.includes("/product/") ? styles.discountedProductSpes : styles.discountedProductList}`}>kr {discountedPrice}</p>
          <p className={styles.percentage}>- {discount}%</p>
        </div>
        {page.includes("/product/") && <p className={styles.originalBefore}>kr {originalPrice}</p>}
      </div>
    );
  }
  if (discountedPrice === originalPrice) {
    return (
      <>
        <p className={`${styles.original} ${page.includes("/product/") ? styles.originalProductSpes : styles.originalProductList}`}>kr {originalPrice}</p>
      </>
    );
  }
}
