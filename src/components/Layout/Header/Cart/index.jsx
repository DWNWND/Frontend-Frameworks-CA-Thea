import CartIcon from "../../../../assets/icons/cart.svg";
import styles from "./Cart.module.css";
import { useCartStore } from "../../../../stores/useCartStore.js";

//"cart" removed from props and changed all "carts" to "cartItems"
export default function Cart() {
  var quantity = 0;
  var arr = [];
  const { cartItems } = useCartStore();

  function calculateQuantityInCart() {
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((item) => {
        arr.push(item.quantity);
      });
      quantity = arr.reduce((a, b) => a + b, 0);
    }
  }

  calculateQuantityInCart();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={`${cartItems.length > 0 ? styles.full : styles.empty} ${styles.counter}`}>{cartItems.length > 0 ? quantity : null}</div>
        <img src={CartIcon} alt="Shopping cart icon, click to go to shopping cart" />
      </div>
    </>
  );
}
