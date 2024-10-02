import styles from "./CheckoutSuccess.module.css";
import { useLocation, Link } from "react-router-dom";
import Price from "../../Price";
import Ratings from "../../Ratings";
import Button from "../../Button";
import checkIfMobileScreen from "../../../checkIfMobileScreen.js";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function CheckoutSuccess() {
  const purchasedProducts = JSON.parse(sessionStorage.getItem("receipt"));
  let paidTotal;

  if (purchasedProducts) {
    let destructuredReceipt = [...purchasedProducts];

    paidTotal = destructuredReceipt.reduce((paid, product) => {
      paid += product.discountedPrice * product.quantity;
      return paid;
    }, 0);
  } else {
    paidTotal = 0;
  }

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Summary | Order successful</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <h1>Thank you for your order</h1>
          <p>TOTAL PAID: kr {paidTotal}</p>
        </div>
        {purchasedProducts ? <Receipt purchase={purchasedProducts} /> : null}
      </div>
    </HelmetProvider>
  );
}

function Receipt({ purchase }) {
  const location = useLocation();
  const page = location.pathname;
  const isMobile = checkIfMobileScreen();

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
                <img src={product.image.url} alt={product.image.alt}></img>
              </Link>
              <div className={styles.infoWrapper}>
                <Link to={`/product/${product.id}`} className={styles.productTitle}>
                  <h3>{product.title}</h3>
                </Link>
                <div className={styles.priceRatingQuantity}>
                  <div className={styles.priceRating}>
                    <Price originalPrice={product.price} discountedPrice={product.discountedPrice} page="/checkout/"></Price>
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
