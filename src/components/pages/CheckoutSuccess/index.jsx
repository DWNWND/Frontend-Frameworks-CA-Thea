import styles from "./CheckoutSuccess.module.css";
import { useLocation } from "react-router-dom";
import Price from "../../Price";
import Ratings from "../../Ratings";
import Button from "../../Button";
import checkIfMobileScreen from "../../../checkIfMobileScreen.js";

export default function CheckoutSuccess() {
  const receipt = JSON.parse(sessionStorage.getItem("receipt"));
  const location = useLocation();
  const page = location.pathname;
  const isMobile = checkIfMobileScreen();

  let paidTotal;

  if (receipt) {
    let destructuredReceipt = [...receipt];

    paidTotal = destructuredReceipt.reduce((paid, product) => {
      paid += product.discountedPrice * product.quantity;
      return paid;
    }, 0);
  } else {
    paidTotal = 0;
  }

  return (
    <div className={styles.container}>
      <div className={styles.successMessage}>
        <h1>Thank you for your order</h1>
        <p>TOTAL PAID: kr {paidTotal}</p>
      </div>
      <section className={styles.receipt}>
        <div className={styles.infoHeader}>
          <h2>You ordered this:</h2>
        </div>
        <div className={styles.products}>
          {receipt ? (
            <>
              {receipt.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.imageWrapper}>
                    <img src={product.image.url} alt={product.image.alt}></img>
                  </div>
                  <div className={styles.infoWrapper}>
                    <h3>{product.title}</h3>
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
            </>
          ) : null}
        </div>
        {isMobile ? null : <Button page={page}></Button>}
      </section>
    </div>
  );
}
