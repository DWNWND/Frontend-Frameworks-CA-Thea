import styles from "./Checkout.module.css";
import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useState, } from "react";
import Price from "../../Price";
import Ratings from "../../Ratings";
import { Quantity } from "../../quanity";
import Button from "../../Button";
import SumTotal from "../../SumTotal";
import checkIfMobileScreen from "../../../checkIfMobileScreen.js";

export default function Checkout() {
  return (
    <div className={styles.wrapper2}>
      <h1>Checkout</h1>
      <ShoppingCart />
    </div>
  );
}

function ShoppingCart() {
  const { cart, setCart, totalSum, setTotalSum } = useOutletContext();

  const isMobile = checkIfMobileScreen();

  const location = useLocation();
  const page = location.pathname;

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
          {isMobile ? null : (
            <>
              <SumTotal totalSum={totalSum} setTotalSum={setTotalSum}></SumTotal>
              <Button page={page} cart={cart} setCart={setCart}></Button>
            </>
          )}
        </>
      ) : (
        <div>Your shopping cart is empty.</div>
      )}
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
            <h2>{product.title}</h2>
            <div className={styles.container}>
              <div className={styles.productInfo}>
                <Price originalPrice={product.price} discountedPrice={product.discountedPrice} page="/checkout/" view="listView"></Price>
                <Ratings rating={product.rating} reviews={product.reviews} section=""></Ratings>
              </div>
              <div className={styles.quantityWrapper}>
                <Quantity page={location.pathname} product={product}></Quantity>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
