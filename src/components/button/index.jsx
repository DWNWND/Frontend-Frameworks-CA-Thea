import styles from "./Button.module.css";
import { useContext } from "react";
import { ProductObjectContext } from "../pages/Product";

let productArray = [];

export default function Button({ page }) {
  const product = useContext(ProductObjectContext);

  var btnClass;
  var btnText;

  if (page.includes("/product/")) {
    btnClass = styles.addToCart;
    btnText = "Add to cart";

    function handleClick() {
      const cartString = localStorage.getItem("shopping-cart");
      const parsedCart = JSON.parse(cartString);

      if (parsedCart && parsedCart.length > 0) {
        console.log("parsed items in local storage", parsedCart);
        productArray = parsedCart;

        const found = productArray.find((item) => item.id === product.id);

        if (found) {
          for (let i = 0; i < productArray.length; i++) {
            if (productArray[i].id === product.id) {
              productArray[i].quantity++;
              localStorage.setItem("shopping-cart", JSON.stringify(productArray));
            }
          }
        } else if (!found) {
          console.log("this item was not in the products array", product);
          product["quantity"] = 1;
          productArray.push(product);
          localStorage.setItem("shopping-cart", JSON.stringify(productArray));
        }
      } else if (!product.quantity) {
        console.log("initial product", product);
        product["quantity"] = 1;
        productArray.push(product);
        localStorage.setItem("shopping-cart", JSON.stringify(productArray));
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
      console.log("checkout");
    }

    return (
      <button className={`${btnClass} ${styles.button}`} onClick={() => handleClick()}>
        {btnText}
      </button>
    );
  }

  if (page.includes("/success")) {
    btnClass = styles.continueShopping;
    btnText = "continue shopping";

    function handleClick() {
      console.log("go back to homepage");
    }

    return (
      <button className={`${btnClass} ${styles.button}`} onClick={() => handleClick()}>
        {btnText}
      </button>
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
