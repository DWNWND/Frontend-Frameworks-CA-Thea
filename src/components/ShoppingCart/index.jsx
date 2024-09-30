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

export function ShoppingCart() {
  const { cart, setCart } = useOutletContext();

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
        </>
      ) : null}
      {isMobile ? null : <Button page={page} cart={cart} setCart={setCart}></Button>}
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
              <Price originalPrice={product.price} discountedPrice={product.discountedPrice} page="/checkout/" view="listView"></Price>
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
