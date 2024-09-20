import styles from "./ProductCards.module.css";
import { useEffect, useState, createContext, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Price from "../Price";
import Ratings from "../Ratings";
import { ProductsContext } from "./index.jsx";

export default function ProductCards() {
  const { products, setProducts } = useContext(ProductsContext);

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
