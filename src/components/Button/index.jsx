import styles from "./Button.module.css";
import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore.js";

export function Button({ page, product }) {
  const { cartItems, addItemToCart, clearCart } = useCartStore();

  const onAddToCart = () => {
    addItemToCart(product);
  };

  const onCheckout = () => {
    sessionStorage.setItem("receipt", JSON.stringify(cartItems));
    clearCart();
  };

  if (page.includes("/product/")) {
    return (
      <button className={`${styles.addToCartBtn} ${styles.buttonGeneral}`} onClick={() => onAddToCart()}>
        Add to cart
      </button>
    );
  }

  if (page.includes("/checkout")) {
    return (
      <Link to="/success" className={`${styles.checkoutBtn} ${styles.buttonGeneral}`} onClick={() => onCheckout()}>
        checkout
      </Link>
    );
  }

  if (page.includes("/success")) {
    function handleClick() {
      sessionStorage.removeItem("receipt");
    }

    return (
      <Link to="/" className={`${styles.continueShoppingBtn} ${styles.buttonGeneral}`} onClick={() => handleClick()}>
        continue shopping
      </Link>
    );
  }

  if (page.includes("/contact")) {
    return (
      <button type="submit" form="contact-form" className={`${styles.sendInquiryBtn} ${styles.buttonGeneral}`}>
        send inquiry
      </button>
    );
  } else {
    return <></>;
  }
}
