import styles from "./Button.module.css";
import { useContext } from "react";
// import { ProductObjectContext } from "../pages/Product";
// import { ShoppingCartContext } from "../Layout";
import { useOutletContext, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

let newProductArray = [];

export default function Button({ page, product, cart, setCart }) {
  var btnClass;
  var btnText;

  if (page.includes("/product/")) {
    btnClass = styles.addToCart;
    btnText = "Add to cart";

    function handleClick() {
      const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
      console.log("product in button", product);

      if (shoppingCart && shoppingCart.length > 0) {
        console.log("parsed items in local storage", shoppingCart);
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
          console.log("this item was not in the products array", product);
          product["quantity"] = 1;
          newProductArray.push(product);
          localStorage.setItem("shopping-cart", JSON.stringify(newProductArray));
          setCart(newProductArray);
        }
      } else if (!product.quantity) {
        console.log("initial product", product);
        product["quantity"] = 1;
        newProductArray = [];
        newProductArray.push(product);
        localStorage.setItem("shopping-cart", JSON.stringify(newProductArray));
        setCart(newProductArray);
      }
    }

    return (
      <>
        <button className={`${btnClass} ${styles.button}`} onClick={() => handleClick()}>
          {btnText}
        </button>
      </>
    );
  }

  if (page.includes("/checkout")) {
    btnClass = styles.checkout;
    btnText = "checkout";

    function handleClick() {
      const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
      sessionStorage.setItem("receipt", JSON.stringify(shoppingCart));
      localStorage.removeItem("shopping-cart");
      setCart([]);
    }

    return (
      <Link to="/success" className={`${btnClass} ${styles.button} ${cart.length > 0 ? styles.full : styles.empty}`} onClick={() => handleClick()}>
        {btnText}
      </Link>
    );
  }

  if (page.includes("/success")) {
    btnClass = styles.continueShopping;
    btnText = "continue shopping";

    function handleClick() {
      sessionStorage.removeItem("receipt");
    }

    return (
      <Link to="/" className={`${btnClass} ${styles.button}`} onClick={() => handleClick()}>
        {btnText}
      </Link>
    );
  }

  if (page.includes("/contact")) {
    btnClass = styles.sendInquiry;
    btnText = "send inquiry";

    function handleClick() {
      console.log("send message");
    }

    return (
      <button className={`${btnClass} ${styles.button}`} onClick={() => handleClick()}>
        {btnText}
      </button>
    );
  } else {
    return <></>;
  }
}
