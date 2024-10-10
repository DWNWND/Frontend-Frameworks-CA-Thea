import styles from "./ProductsInCart.module.css";
import { Link } from "react-router-dom";
import {Price, Ratings, Quantity} from "../../";


export default function ProductsInCart({ product, page }) {
  return (
    <>
      {product ? (
        <div className={styles.productCard}>
          <Link to={`/product/${product.id}`} className={styles.imageWrapper}>
            <img src={product.image.url} alt={product.image.alt ? product.image.alt : "image of product in cart"}></img>
          </Link>
          <div className={styles.productInfo}>
            <Link to={`/product/${product.id}`} className={styles.productTitle}>
              <h2>{product.title}</h2>
            </Link>
            <div className={styles.priceRatingQuantityContainer}>
              <div className={styles.priceRatingContainer}>
                <Price originalPrice={product.price} discountedPrice={product.discountedPrice} page="/checkout/" view="listView"></Price>
                <Ratings rating={product.rating} reviews={product.reviews} section=""></Ratings>
              </div>
              <div className={styles.quantityWrapper}>
                <Quantity page={page} product={product}></Quantity>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}