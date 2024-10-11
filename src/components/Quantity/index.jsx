import styles from "./Quantity.module.css";
import { useReducer, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore.js";

function reducer(state, action) {
  let newProductsArray = [];
  let cart;
  let newTotal;

  switch (action.type) {
    case "increment":
      newProductsArray = JSON.parse(localStorage.getItem("shopping-cart"));
      cart = [...newProductsArray];
      newTotal = cart.reduce((currentTotal, product) => {
        currentTotal += product.discountedPrice * product.quantity;
        return currentTotal;
      }, 0);
      return { count: state.count + 1, total: newTotal };

    case "decrement":
      newProductsArray = JSON.parse(localStorage.getItem("shopping-cart"));
      cart = [...newProductsArray];
      newTotal = cart.reduce((currentTotal, product) => {
        currentTotal += product.discountedPrice * product.quantity;
        return currentTotal;
      }, 0);

      if (state.count === 1) {
        return { count: 1, total: newTotal };
      } else {
        return { count: state.count - 1, total: newTotal };
      }
    case "reset":
      return { count: 0 };
    default:
      throw new Error();
  }
}

export function Quantity({ page, product }) {
  const { totalSum, setTotalSum } = useOutletContext();
  const { increaseQuantity, decreaseQuantity } = useCartStore();

  const initialState = { product: product, total: totalSum, count: product.quantity };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setTotalSum(state.total);
  });

  let checkout = false;

  const increase = () => {
    increaseQuantity(product.id);
  };

  const decrease = () => {
    decreaseQuantity(product.id);
  };

  if (page.includes("/checkout")) {
    checkout = true;
  }

  return (
    <div className={checkout ? styles.wrapperCheckout : styles.wrapperProductSpesific}>
      <div className={checkout ? styles.titleCheckout : styles.titleProductSpesific}>quantity:</div>
      <div className={checkout ? styles.bulletCheckout : styles.bulletProductSpesific}>
        <button
          className={styles.minus}
          onClick={() => {
            dispatch({ type: "decrement" }), decrease(product);
          }}>
          &#45;
        </button>
        <span className={checkout ? styles.amountCheckout : styles.amountProductSpesific}>{state.count}</span>
        <button
          className={styles.pluss}
          onClick={() => {
            dispatch({ type: "increment" }), increase(product);
          }}>
          &#43;
        </button>
      </div>
    </div>
  );
}
