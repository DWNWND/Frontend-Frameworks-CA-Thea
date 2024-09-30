import styles from "./CheckoutSuccess.module.css";
import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import Price from "../../Price";
import Ratings from "../../Ratings";
import Button from "../../Button";
import { useState } from "react";

export default function CheckoutSuccess() {
  const { totalSum } = useOutletContext();
  const receipt = JSON.parse(sessionStorage.getItem("receipt"));
  const location = useLocation();
  const page = location.pathname;

  //add link to source here
  const checkIfMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }, []);

    return width <= 768;
  };

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

  console.log(paidTotal);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Thank you for your order</h1>
        <p>TOTAL PAID: kr {paidTotal}</p>
      </div>
      <div className={styles.receipt}>
        <div className={styles.infoHeader}>
          <h2>You ordered this:</h2>
        </div>
        <div className={styles.products}>
          {receipt ? (
            <>
              {receipt.map((product) => (
                <div key={product.id} className={styles.cardWrapper}>
                  <div className={styles.imageWrapper}>
                    <img src={product.image.url} alt={product.image.alt}></img>
                  </div>
                  <div className={styles.infoWrapper}>
                    <h2>{product.title}</h2>
                    <div className={styles.bottomWrapper}>
                      <div className={styles.productInfo}>
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
      </div>
    </div>
  );
}
