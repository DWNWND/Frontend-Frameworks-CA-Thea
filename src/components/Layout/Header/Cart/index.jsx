import CartIcon from "../../../../assets/icons/cart.svg";
import { useEffect } from "react";
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
    } else if (!cart) {
      console.log("no shopping cart");
    }
  }

  useEffect(() => {
    calculateQuantityInCart();
  }, [cart]);

  calculateQuantityInCart();

  return (
    <>
      <div className={styles.parent}>
        <div className={cart.length > 0 ? styles.cartIconFull : styles.cartIconEmpty}>{quantity}</div>
        <img src={CartIcon} alt="Shopping cart icon, click to go to shopping cart" />
      </div>
    </>
  );
}
