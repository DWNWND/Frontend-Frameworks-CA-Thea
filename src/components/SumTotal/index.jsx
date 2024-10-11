import { useEffect } from "react";
import styles from "./SumTotal.module.css";
import { useCartStore } from "../../stores/useCartStore.js";

export function SumTotal({ totalSum, setTotalSum }) {
  const { cartItems } = useCartStore();

  // let newShoppingCartArray = JSON.parse(localStorage.getItem("shopping-cart"));
  let currentSumTotal;

  if (cartItems) {
    let destructuredCart = [...cartItems];

    currentSumTotal = destructuredCart.reduce((currentTotal, product) => {
      currentTotal += product.discountedPrice * product.quantity;
      const rounded = Math.round(currentTotal * 100) / 100;
      return rounded;
    }, 0);
  } else {
    currentSumTotal = 0;
  }

  useEffect(() => {
    setTotalSum(currentSumTotal);
  });

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Sumtotal</h2>
      <div className={styles.sum}>kr {totalSum}</div>
    </div>
  );
}
