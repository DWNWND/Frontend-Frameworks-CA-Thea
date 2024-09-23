import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Header from "./Header/index.jsx";
import Footer from "./Footer/index.jsx";

export function Layout() {
  const [cart, setCart] = useState(["test", "test"]);
  const location = useLocation();

  useEffect(() => {
    let newProductsArray = [];
    const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
    newProductsArray = shoppingCart;
    setCart(newProductsArray);
    console.log("Cart update on location change - Layout", newProductsArray);
  }, [location]);

  console.log(cart);
  return (
    <div>
      <Header cart={cart} />
      <Outlet context={{ cart, setCart }} />
      {/* <Footer page={location.pathname} /> */}
    </div>
  );
}
