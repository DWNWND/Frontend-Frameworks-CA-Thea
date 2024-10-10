import { Link, useLocation } from 'react-router-dom';
import styles from './Summary.module.css';
import Price from '../Price';
import Ratings from '../Ratings';
import Button from '../Button';
import useScreenSizeCheck from '../../hooks/useScreenSizeCheck';


export default function Summary({ purchase }) {
  const location = useLocation();
  const page = location.pathname;
  const isMobile = useScreenSizeCheck();

  return (
    <>
      <section className={styles.receipt}>
        <div className={styles.infoHeader}>
          <h2>You ordered this:</h2>
        </div>
        <div className={styles.summaryContainer}>
          {purchase.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Link to={`/product/${product.id}`} className={styles.imageWrapper}>
                <img src={product.image.url} alt={product.image.alt ? product.image.alt : "image of bought product"}></img>
              </Link>
              <div className={styles.infoWrapper}>
                <Link to={`/product/${product.id}`} className={styles.productTitle}>
                  <h3>{product.title}</h3>
                </Link>
                <div className={styles.priceRatingQuantity}>
                  <div className={styles.priceRating}>
                    <Price originalPrice={product.price} discountedPrice={product.discountedPrice} page="/checkout/" view="listView"></Price>
                    <Ratings rating={product.rating} reviews={product.reviews} section=""></Ratings>
                  </div>
                  <div className={styles.quantityWrapper}>number of items: {product.quantity}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isMobile ? null : <Button page={page}></Button>}
      </section>
    </>
  );
}