import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Header from "./Header/index.jsx";
import Footer from "./Footer/index.jsx";
import useFetch from "../../hooks/useFetch.jsx";

const url = "https://v2.api.noroff.dev/online-shop";
export const ProductsContext = createContext();
export const FilterContext = createContext();

export function Layout() {
  const { data, isLoading, isError } = useFetch(url);

  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState({});
  const [totalSum, setTotalSum] = useState(0);

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState("topSales");

  const location = useLocation();
  const page = location.pathname;

  function initializeCart() {
    let newProductsArray = [];
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
    const productArray = data.data;
    setProducts(productArray);
  }, [location, data]);

  return (
    <>
      <Header cart={cart} products={products} />
      <Outlet context={{ isLoading, isError, products, product, setProduct, cart, setCart, totalSum, setTotalSum, filters, setFilters }} />
      <Footer page={page} product={product} setCart={setCart} totalSum={totalSum} setTotalSum={setTotalSum} />
    </>
  );
}
