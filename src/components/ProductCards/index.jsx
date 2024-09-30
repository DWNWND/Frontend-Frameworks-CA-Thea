import { useEffect, useState, createContext, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Price from "../Price";
import Ratings from "../Ratings";
import styles from "./ProductCards.module.css";
import Filters from "../Filters";
import { ProductTagContext } from "../pages/Product/index.jsx";

const url = "https://v2.api.noroff.dev/online-shop";

export const FilterContext = createContext();
export const ProductsContext = createContext();

export function ProductsToDisplay() {
  const tag = useContext(ProductTagContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filters, setFilters] = useState("topSales");

  let { category } = useParams();
  const location = useLocation();
  const page = location.pathname;

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
        if (page.includes("/product/")) {
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
  }, [filters]);

  if (isLoading) {
    return <div className="loader">Loading products . . .</div>;
  }

  if (isError) {
    return <div className="error">Error loading data</div>;
  }

  return (
    <>
      {page.includes("/product/") ? null : (
        <FilterContext.Provider value={{ filters, setFilters }}>
          <Filters page={page} />
        </FilterContext.Provider>
      )}
      <ProductsContext.Provider value={products}>
        <ProductCards />
      </ProductsContext.Provider>
    </>
  );
}

function ProductCards() {
  const products = useContext(ProductsContext);

  return (
    <div className={styles.wrapper}>
      {products.map((product) => (
        <Link to={"/product/" + product.id} key={product.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={product.image.url} alt={product.image.alt} />
          </div>
          <div className={styles.infoContainer}>
            <h2>{product.title}</h2>
            <Price originalPrice={product.price} discountedPrice={product.discountedPrice} page="" view="listView" />
            <Ratings rating={product.rating} reviews={product.reviews} />
          </div>
        </Link>
      ))}
    </div>
  );
}
