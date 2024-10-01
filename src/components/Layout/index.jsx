import { Outlet, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Header from "./Header/index.jsx";
import Footer from "./Footer/index.jsx";

const url = "https://v2.api.noroff.dev/online-shop";
export const ProductsContext = createContext();
export const FilterContext = createContext();

export function Layout() {
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState({});
  const [totalSum, setTotalSum] = useState(0);

  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState("topSales");

  let { category } = useParams();
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
  }, [, location]);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetch(url);
        const json = await response.json();
        const data = json.data;

        if (filters === "topSales") {
          const sortedProducts = data.sort((a, b) => b.reviews.length - a.reviews.length);
          setProducts(sortedProducts);
        }
        if (filters === "discountedItems") {
          const filteredProducts = data.filter((product) => product.discountedPrice !== product.price);
          setProducts(filteredProducts);
        }
        if (page.includes(category)) {
          const categorizedProducts = data.filter((product) => product.tags.includes(category));
          setProducts(categorizedProducts);

          if (filters === "topSales") {
            const sortedProducts = categorizedProducts.sort((a, b) => b.reviews.length - a.reviews.length);
            setProducts(sortedProducts);
          }
          if (filters === "discountedItems") {
            const filteredProducts = categorizedProducts.filter((product) => product.discountedPrice !== product.price);
            setProducts(filteredProducts);
          }
        }
        if (page.includes("/product/") && tag) {
          const taggedProducts = data.filter((product) => product.tags.includes(tag));
          setProducts(taggedProducts);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    }
    getData();
  }, [filters, tag]);

  return (
    <>
      <Header cart={cart} />
      <Outlet context={{ isLoading, isError, products, product, setProduct, cart, setCart, totalSum, setTotalSum, setTag, filters, setFilters }} />
      <Footer page={page} product={product} cart={cart} setCart={setCart} totalSum={totalSum} setTotalSum={setTotalSum} />
    </>
  );
}
