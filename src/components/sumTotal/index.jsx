import { useEffect } from "react";
import styles from "./SumTotal.module.css";

export default function SumTotal({ totalSum, setTotalSum }) {
  let newShoppingCartArray = JSON.parse(localStorage.getItem("shopping-cart"));
  let currentSumTotal;

  if (newShoppingCartArray) {
    let destructuredCart = [...newShoppingCartArray];

    currentSumTotal = destructuredCart.reduce((currentTotal, product) => {
      currentTotal += product.discountedPrice * product.quantity;
      return currentTotal;
    }, 0);
  } else {
    currentSumTotal = 0;
  }

  useEffect(() => {
    setTotalSum(currentSumTotal);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Sumtotal</h2>
      <div className={styles.sum}>kr {totalSum !== null && currentSumTotal !== null ? (totalSum === currentSumTotal ? Math.round(totalSum) : Math.round(currentSumTotal)) : 0}</div>
    </div>
  );
}
