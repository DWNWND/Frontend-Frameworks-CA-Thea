import styles from "./Quantity.module.css";
import { useReducer, createContext } from "react";


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

let productArray = [];

function testFunction(product) {
  const cartString = localStorage.getItem("shopping-cart");
  const parsedCart = JSON.parse(cartString);

  productArray = parsedCart;

  const found = productArray.find((item) => item.id === product.id);

  if (found) {
    for (let i = 0; i < productArray.length; i++) {
      if (productArray[i].id === product.id) {
        productArray[i].quantity++;
        localStorage.setItem("shopping-cart", JSON.stringify(productArray));
      }
    }
  } else {
    throw new Error("Product you want to increment is not found in the cart");
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

export const QuantityContext = createContext();

export default function Quantity({ page, product }) {
  const initialState = { count: product.quantity };

  const [state, dispatch] = useReducer(reducer, initialState);

  let checkout = false;

  if (page.includes("/checkout")) {
    checkout = true;
  }

  return (
    <div className={checkout ? styles.wrapperCheckout : styles.wrapperProductSpesific}>
      <div className={checkout ? styles.titleCheckout : styles.titleProductSpesific}>quantity:</div>
      <div className={checkout ? styles.bulletCheckout : styles.bulletProductSpesific}>
        <button className={styles.minus} onClick={() => dispatch({ type: "decrement" })}>
          &#45;
        </button>
        <span className={checkout ? styles.amountCheckout : styles.amountProductSpesific}>{state.count}</span>
        <button
          className={styles.pluss}
          onClick={() => {
            dispatch({ type: "increment" }), testFunction(product);
          }}>
          &#43;
        </button>
      </div>
    </div>
  );
}
