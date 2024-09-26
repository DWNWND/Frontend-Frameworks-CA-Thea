import styles from "./CheckoutSuccess.module.css";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import Price from "../../Price";
import Ratings from "../../Ratings";

export default function CheckoutSuccess() {
  const { totalSum } = useOutletContext();
  const receipt = JSON.parse(sessionStorage.getItem("receipt"));

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

  console.log(paidTotal);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Thank you for your order</h1>
        <p>PAID: kr{paidTotal}</p>
      </div>
      <div className={styles.receipt}>
        <div className={styles.infoHeader}>
          <h2>You ordered this:</h2>
        </div>
        <div>
          {receipt ? (
            <>
              {receipt.map((product) => (
                <div key={product.id}>
                  <div className={styles.cardWrapper}>
                    <div className={styles.imageWrapper}>
                      <img src={product.image.url} alt={product.image.alt}></img>
                    </div>
                    <div className={styles.infoWrapper}>
                      <div className={styles.productInfo}>
                        <h2>{product.title}</h2>
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
      </div>
    </div>
  );
}
