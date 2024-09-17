import { useEffect, useState } from "react";
import styles from "./ProductCards.module.css";
import Price from "../Price";
import Ratings from "../Ratings";

const url = "https://v2.api.noroff.dev/online-shop";

export default function ProductCards() {
  const [products, setProducts] = useState([]);

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
        setProducts(data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, []);

  console.log(products);

  if (isLoading) {
    return <div>Loading posts</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className={styles.wrapper}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={product.image.url} alt={product.image.alt} />
          </div>
          <div className={styles.infoContainer}>
            <h2>{product.title}</h2>
            <Price originalPrice={product.price} discountedPrice={product.discountedPrice}/>
            <Ratings rating={product.rating} reviews={product.reviews}/>
          </div>
        </div>
      ))}
    </div>
  );
}
