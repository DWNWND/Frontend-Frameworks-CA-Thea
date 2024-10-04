import styles from "./Quantity.module.css";
import { useReducer, createContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function reducer(state, action) {
  let newProductsArray = [];
  let cart;
  let newTotal;

  // These are actions that can be dispatched
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

      // Set the new total so we don't have to keep calculating it
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

export const QuantityContext = createContext();

export function Quantity({ page, product }) {
  const { setCart, totalSum, setTotalSum } = useOutletContext();
  const initialState = { product: product, total: totalSum, count: product.quantity };
  const [state, dispatch] = useReducer(reducer, initialState);

  let newProductsArray = [];

  useEffect(() => {
    setTotalSum(state.total);
  },);

  let checkout = false;

  if (page.includes("/checkout")) {
    checkout = true;
  }

  function addToLocalStorage(product) {
    newProductsArray = JSON.parse(localStorage.getItem("shopping-cart"));

    const duplicates = newProductsArray.find((item) => item.id === product.id);

    if (duplicates) {
      for (let i = 0; i < newProductsArray.length; i++) {
        if (newProductsArray[i].id === product.id) {
          newProductsArray[i].quantity++;
          localStorage.setItem("shopping-cart", JSON.stringify(newProductsArray));
          setCart(newProductsArray);
        }
      }
    } else {
      throw new Error("Product you want to increment is not found in the cart");
    }
  }

  function removeFromLocalStorage(product) {
    newProductsArray = JSON.parse(localStorage.getItem("shopping-cart"));

    const duplicates = newProductsArray.find((item) => item.id === product.id);

    if (duplicates) {
      for (let i = 0; i < newProductsArray.length; i++) {
        if (newProductsArray[i].id === product.id) {
          newProductsArray[i].quantity--;
          localStorage.setItem("shopping-cart", JSON.stringify(newProductsArray));
          setCart(newProductsArray);
        }

        if (newProductsArray[i].quantity < 1) {
          alert("Removing product from cart");
          const newArr = newProductsArray.filter((product) => product.quantity > 0);
          newProductsArray = newArr;
          localStorage.setItem("shopping-cart", JSON.stringify(newProductsArray));
          setCart(newProductsArray);
        }
      }
    } else {
      throw new Error("Product you want to increment is not found in the cart");
    }
  }

  return (
    <div className={checkout ? styles.wrapperCheckout : styles.wrapperProductSpesific}>
      <div className={checkout ? styles.titleCheckout : styles.titleProductSpesific}>quantity:</div>
      <div className={checkout ? styles.bulletCheckout : styles.bulletProductSpesific}>
        <button
          className={styles.minus}
          onClick={() => {
            dispatch({ type: "decrement" }), removeFromLocalStorage(product);
          }}>
          &#45;
        </button>
        <span className={checkout ? styles.amountCheckout : styles.amountProductSpesific}>{state.count}</span>
        <button
          className={styles.pluss}
          onClick={() => {
            dispatch({ type: "increment" }), addToLocalStorage(product);
          }}>
          &#43;
        </button>
      </div>
    </div>
  );
}
