import { Link, useLocation, useOutletContext } from "react-router-dom";
import Price from "../Price/index.jsx";
import Ratings from "../Ratings/index.jsx";
import styles from "./ProductCards.module.css";
import Filters from "../Filters/index.jsx";

export function ProductsToDisplay() {
  const { isLoading, isError } = useOutletContext();

  const location = useLocation();
  const page = location.pathname;

  if (isLoading) {
    return <div className="loader">Loading products . . .</div>;
  }

  if (isError) {
    return <div className="error">Error loading data</div>;
  }

  return (
    <div className={page.includes("/product/") ? null : styles.containerListView}>
      {page.includes("/product/") ? null : (
        <Filters />
      )}
      <ProductCards />
      <p className={styles.allProductsDisplayed}>All relevant products displayed.</p>
    </div>
  );
}

function ProductCards() {
  const { products } = useOutletContext();

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
