import styles from "./ShoppingCart.module.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useReducer, useState, createContext, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import Price from "../Price";
import Ratings from "../Ratings";
import Footer from "../Layout/Footer";
import { Quantity } from "../quanity";
import { useOutletContext } from "react-router-dom";
import Button from "../Button";
import SumTotal from "../SumTotal";

export function ShoppingCart() {
  const { cart, setCart, totalSum, setTotalSum } = useOutletContext();

  //add link to source here
  const checkIfMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }, []);

    return width <= 768;
  };

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
