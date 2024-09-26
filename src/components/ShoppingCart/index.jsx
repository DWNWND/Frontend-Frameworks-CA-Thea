import styles from "./ShoppingCart.module.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useReducer, useState, createContext, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import Price from "../Price";
import Ratings from "../Ratings";
import Footer from "../Layout/Footer";
import { Quantity } from "../quanity";
import { useOutletContext } from "react-router-dom";

export function ShoppingCart() {
  const { cart, setCart } = useOutletContext();

  const location = useLocation();

  let newProductsArray = [];

  function checkProductQuantity() {
    const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));

    if (shoppingCart) {
      newProductsArray = shoppingCart.filter((product) => product.quantity > 0);
      localStorage.setItem("shopping-cart", JSON.stringify(newProductsArray));
    } else {
      console.log("there are no items in the shopping cart");
    }
  }

  useEffect(() => {
    checkProductQuantity();
  }, [cart]);

  checkProductQuantity();

  return (
    <>
      {newProductsArray.length > 0 ? (
        <>
          <div className={styles.wrapper}>
            {newProductsArray.map((product) => (
              <ProductCartCards product={product} key={product.id}></ProductCartCards>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

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

{
  /* <div>
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
      </div> */
}
