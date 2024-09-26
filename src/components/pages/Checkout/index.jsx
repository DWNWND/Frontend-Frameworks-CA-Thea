import { ShoppingCart } from "../../ShoppingCart";
import styles from "./Checkout.module.css";

export default function Checkout() {
  return (
    <div className={styles.wrapper}>
      <h1>Checkout</h1>
      <ShoppingCart />
    </div>
  );
}
