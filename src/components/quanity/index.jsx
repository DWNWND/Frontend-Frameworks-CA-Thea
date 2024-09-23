import styles from "./Quantity.module.css";
import { useReducer, createContext } from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";

function reducer(state, action) {
  // These are actions that can be dispatched
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      if (state.count === 1) {
        return { count: 1 };
      } else {
        return { count: state.count - 1 };
      }
    case "reset":
      return { count: 0 };
    default:
      throw new Error();
  }
}

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <div>
//       <div>Count: {state.count}</div>
//       <button onClick={() => dispatch({ type: "decrement" })}>-</button>
//       <button onClick={() => dispatch({ type: "increment" })}>+</button>
//       <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
//     </div>
//   );
// }

let newProductsArray = [];

export const QuantityContext = createContext();

export function Quantity({ page, product }) {
  const { cart, setCart } = useOutletContext();
  const initialState = { count: product.quantity };
  const [state, dispatch] = useReducer(reducer, initialState);

  let checkout = false;

  if (page.includes("/checkout")) {
    checkout = true;
  }

  function addToLocalStorage(product) {
    const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
    newProductsArray = shoppingCart;

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
    const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
    newProductsArray = shoppingCart;

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
