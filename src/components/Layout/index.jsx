import { Outlet, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Header from "./Header/index.jsx";
import Footer from "./Footer/index.jsx";
import useFetch from "../../hooks/useFetch";

export function Layout() {
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState({});
  const [totalSum, setTotalSum] = useState(0);
  const location = useLocation();

  function initializeCart() {
    let newProductsArray = [];
    // let currentSumTotal;
    const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));

    if (shoppingCart) {
      if (shoppingCart.length > 0) {
        newProductsArray = shoppingCart;

        setCart(newProductsArray);
        console.log("Cart update on mounting of - Layout", newProductsArray);
      }
    } else {
      console.log("No items in shopping cart");
    }
  }

  useEffect(() => {
    initializeCart();
  }, [, location]);

  return (
    <>
      <Header cart={cart} />
      <Outlet context={{ product, setProduct, cart, setCart, totalSum, setTotalSum }} />
      <Footer page={location.pathname} product={product} cart={cart} setCart={setCart} totalSum={totalSum} setTotalSum={setTotalSum} />
    </>
  );
}
