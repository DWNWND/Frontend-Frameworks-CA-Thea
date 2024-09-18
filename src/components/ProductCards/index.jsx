import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCards.module.css";
import Price from "../Price";
import Ratings from "../Ratings";

const url = "https://v2.api.noroff.dev/online-shop";

export default function ProductCards() {
  const [products, setProducts] = useState([]);
  const [filterButtons, setfilterButtons] = useState([]);
  const [filterActive, setfilterActive] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetch(url);
        const json = await response.json();
        const data = json.data;

        const topSalesProducts = data.sort((a, b) => b.reviews.length - a.reviews.length);
        setProducts(topSalesProducts);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    const filtersContainer = document.getElementById("filters");
    const filtersAll = filtersContainer.querySelectorAll("button");
    setfilterButtons(filtersAll);
  }, [filterActive]);

  if (isLoading) {
    return <div>Loading posts</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "TopSales") {
        const sortedProducts = products.sort((a, b) => b.reviews.length - a.reviews.length);
        setProducts(sortedProducts);
        setfilterActive(false);
        setfilterButtons([]);
      }

      if (button.id === "DiscountedItems") {
        const filteredProducts = products.filter((product) => product.discountedPrice !== product.price);
        setProducts(filteredProducts);
        setfilterActive(false);
        setfilterButtons([]);
      }
    });
  });

  return (
    <div className={styles.wrapper}>
      {products.map((product) => (
        <Link to={"/product/" + product.id} key={product.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={product.image.url} alt={product.image.alt} />
          </div>
          <div className={styles.infoContainer}>
            <h2>{product.title}</h2>
            <Price originalPrice={product.price} discountedPrice={product.discountedPrice} />
            <Ratings rating={product.rating} reviews={product.reviews} />
          </div>
        </Link>
      ))}
    </div>
  );
}
