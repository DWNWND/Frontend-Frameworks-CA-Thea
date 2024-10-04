import CartIcon from "../../../../assets/icons/cart.svg";
import styles from "./Cart.module.css";

export default function Cart({ cart }) {
  var quantity;
  var arr = [];

  function calculateQuantityInCart() {
    if (cart && cart.length > 0) {
      cart.forEach((item) => {
        arr.push(item.quantity);
      });
      quantity = arr.reduce((a, b) => a + b, 0);
    }
  }

  calculateQuantityInCart();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={`${cart.length > 0 ? styles.full : styles.empty} ${styles.counter}`}>{cart.length > 0 ? quantity : null}</div>
        <img src={CartIcon} alt="Shopping cart icon, click to go to shopping cart" />
      </div>
    </>
  );
}
