import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Header from "./Header/index.jsx";
import Footer from "./Footer/index.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../";

const url = import.meta.env.VITE_API_BASE_URL;

export const ProductsContext = createContext();
export const FilterContext = createContext();

export function Layout() {
  const { data, isLoading, isError } = useFetch(url);

  // const [cart, setCart] = useState([]);
  const [product, setProduct] = useState({});
  const [totalSum, setTotalSum] = useState(0);

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState("topSales");

  const location = useLocation();
  const page = location.pathname;

  // function initializeCart() {
  //   let newProductsArray = [];
  //   const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));

  //   if (shoppingCart) {
  //     if (shoppingCart.length > 0) {
  //       newProductsArray = shoppingCart;
  //       setCart(newProductsArray);
  //     }
  //   }
  // }

  useEffect(() => {
    // initializeCart();
    const productArray = data.data;
    setProducts(productArray);
  }, [location, data]);

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header products={products} />
        {/* <Header cart={cart} products={products} /> */}
        <Outlet context={{ isLoading, isError, products, product, setProduct, totalSum, setTotalSum, filters, setFilters }} />
        {/* <Outlet context={{ isLoading, isError, products, product, setProduct, cart, setCart, totalSum, setTotalSum, filters, setFilters }} /> */}
        <Footer page={page} product={product} totalSum={totalSum} setTotalSum={setTotalSum} />
        {/* <Footer page={page} product={product} setCart={setCart} totalSum={totalSum} setTotalSum={setTotalSum} /> */}
      </ErrorBoundary>
    </>
  );
}
