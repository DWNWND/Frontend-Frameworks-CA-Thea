import { useEffect, useState, createContext, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Price from "../Price";
import Ratings from "../Ratings";
import styles from "./ProductCards.module.css";
import Filters from "../Filters";

const url = "https://v2.api.noroff.dev/online-shop";

export const FilterContext = createContext();

export function ProductsToDisplay() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filters, setFilters] = useState("topSales");

  let { category } = useParams();
  const location = useLocation();

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
        if (location.pathname.includes(category)) {
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
    return <div>Loading posts</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      <div>
        <Filters page={location} />
        <ProductsCards products={products} />
      </div>
    </FilterContext.Provider>
  );
}

function ProductsCards({ products }) {
  return (
    <div className={styles.wrapper}>
      {products.map((product) => (
        <Link to={"/product/" + product.id} key={product.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={product.image.url} alt={product.image.alt} />
          </div>
          <div className={styles.infoContainer}>
            <h2>{product.title}</h2>
            <Price originalPrice={product.price} discountedPrice={product.discountedPrice} page="" />
            <Ratings rating={product.rating} reviews={product.reviews} />
          </div>
        </Link>
      ))}
    </div>
  );
}
