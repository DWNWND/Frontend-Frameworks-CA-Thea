import styles from "./Button.module.css";
import { Link } from "react-router-dom";

let newProductArray = [];

export default function Button({ page, product, setCart }) {
  if (page.includes("/product/")) {
    function handleClick() {
      const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));

      if (shoppingCart && shoppingCart.length > 0) {
        newProductArray = shoppingCart;
        const duplicates = newProductArray.find((item) => item.id === product.id);

        if (duplicates) {
          for (let i = 0; i < newProductArray.length; i++) {
            if (newProductArray[i].id === product.id) {
              newProductArray[i].quantity++;
              localStorage.setItem("shopping-cart", JSON.stringify(newProductArray));
              setCart(newProductArray);
            }
          }
        } else if (!duplicates) {
          product["quantity"] = 1;
          newProductArray.push(product);
          localStorage.setItem("shopping-cart", JSON.stringify(newProductArray));
          setCart(newProductArray);
        }
      } else if (!product.quantity) {
        product["quantity"] = 1;
        newProductArray = [];
        newProductArray.push(product);
        localStorage.setItem("shopping-cart", JSON.stringify(newProductArray));
        setCart(newProductArray);
      }
    }

    return (
      <button className={`${styles.addToCartBtn} ${styles.buttonGeneral}`} onClick={() => handleClick()}>
        Add to cart
      </button>
    );
  }

  if (page.includes("/checkout")) {
    function handleClick() {
      const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
      sessionStorage.setItem("receipt", JSON.stringify(shoppingCart));
      localStorage.removeItem("shopping-cart");
      setCart([]);
    }

    return (
      <Link to="/success" className={`${styles.checkoutBtn} ${styles.buttonGeneral}`} onClick={() => handleClick()}>
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
