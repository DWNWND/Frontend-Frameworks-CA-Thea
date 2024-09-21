import styles from "./ShoppingCart.module.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
// import ProductCards from "../ProductCards/card";
import useFetch from "../../hooks/useFetch";
import Price from "../Price";
import Ratings from "../Ratings";
import Footer from "../Layout/Footer";
import Quantity from "../Quanity";

export const initialState = { cart: [], total: 0 };

export function reducer(state, action) {
  let productIndex;
  let newTotal;
  let cart;

  switch (action.type) {
    // Adding a product
    case "addProduct":
      // Create a new cart so we don't mutate our state
      cart = [...state.cart];
      // Get the product index
      productIndex = cart.findIndex((product) => product.id === action.payload.id);
      if (productIndex === -1) {
        // If productIndex is -1, it doesn't exist so we add it
        cart.push({ ...action.payload, quantity: 1 });
      } else {
        // The product does exist so we increase the quantity
        // We do not want to mutate quantity so we are creating a new array with
        // quantity incremented.
        cart = [...cart.slice(0, productIndex), { ...cart[productIndex], quantity: cart[productIndex].quantity + 1 }, ...cart.slice(productIndex + 1)];
      }
      // Set the new total so we don't have to keep calculating it
      newTotal = cart.reduce((currentTotal, product) => {
        currentTotal += product.discountedPrice * product.quantity;
        return currentTotal;
      }, 0);
      return { ...state, cart: cart, total: newTotal };

    // Removing a product
    case "removeProduct":
      cart = [...state.cart];
      // Get the product index
      productIndex = cart.findIndex((product) => product.id === action.payload.id);
      // If the product index is not -1 then it exists
      if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
          // Remove 1 from quantity is quantity is higher than 1
          // We do not want to mutate cart so we recreate it
          cart = [
            ...cart.slice(0, productIndex),
            {
              ...cart[productIndex],
              quantity: cart[productIndex].quantity - 1,
            },
            ...cart.slice(productIndex + 1),
          ];
        } else {
          // Remove the item entirely if quantity is going to be 0
          cart = [...cart.slice(0, productIndex), ...cart.slice(productIndex + 1)];
        }
      }
      // Set the new total so we don't have to keep calculating it
      newTotal = cart.reduce((currentTotal, product) => {
        currentTotal += product.discountedPrice * product.quantity;
        return currentTotal;
      }, 0);
      return { ...state, cart: cart, total: newTotal };

    // Clearing a cart
    case "clearCart":
      return { cart: [], total: 0 };

    default:
      return state;
  }
}

export function ShoppingCart() {
  // const [cart, setCart] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const location = useLocation();

  const itemsInLocalStorage = localStorage.getItem("shopping-cart");
  const productsInCart = JSON.parse(itemsInLocalStorage);

  return (
    <>
      {productsInCart ? (
        <>
          <div className={styles.wrapper}>
            {productsInCart.map((product) => (
              <ProductCartCards product={product} key={product.id}></ProductCartCards>
            ))}
          </div>
          <Footer page={location.pathname} />
        </>
      ) : null}

      {/* <div>
        {productsInCart.map((product) => (
          <div key={product.id}>
            <button onClick={() => dispatch({ type: "addProduct", payload: product })}>Add {product.title}</button>
            <button onClick={() => dispatch({ type: "removeProduct", payload: product })}>Remove {product.title}</button>
          </div>
        ))}
        <div>
          <hr />
          <button onClick={() => dispatch({ type: "clearCart" })}>Clear cart</button>
          <button onClick={() => dispatch({ type: "getTotal" })}>Get total</button>
        </div>
        <div>{state.total}</div>
        <hr />
        <div>
          {state.cart.map((product) => (
            <div key={product.id}>
              {product.quantity} - {product.title} - {product.discountedPrice}
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}

const url = "https://v2.api.noroff.dev/online-shop";

function ProductCartCards({ product }) {
  const location = useLocation();

  return (
    <>
      {product ? (
        <div className={styles.cardWrapper}>
          <div className={styles.imageWrapper}>
            <img src={product.image.url} alt={product.image.alt}></img>
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.productInfo}>
              <h2>{product.title}</h2>
              <Price originalPrice={product.price} discountedPrice={product.discountedPrice} page="/checkout/"></Price>
              <Ratings rating={product.rating} reviews={product.reviews} section=""></Ratings>
            </div>
            <div className={styles.quantityWrapper}>
              <Quantity page={location.pathname} product={product}></Quantity>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
