import { Link, useLocation, useOutletContext } from "react-router-dom";
import Price from "../Price/index.jsx";
import Ratings from "../Ratings/index.jsx";
import styles from "./ProductCards.module.css";
import Filters from "../Filters/index.jsx";
import { useParams } from "react-router-dom";

export function ProductsToDisplay({ tag }) {
  const { products, isLoading, isError } = useOutletContext();

  const location = useLocation();
  const page = location.pathname;

  if (isLoading) {
    return <div className="loader">Loading products . . .</div>;
  }

  if (isError || !products) {
    return <div className="error">Error loading data</div>;
  }

  return (
    <div className={page.includes("/product/") ? null : styles.containerListView}>
      {page.includes("/product/") ? null : <Filters />}
      <ProductCards tag={tag} page={page} />
      <p className={styles.allProductsDisplayed}>All relevant products displayed.</p>
    </div>
  );
}

function ProductCards({ page, tag }) {
  const { products, filters } = useOutletContext();
  let { category } = useParams();

  let renderProducts = [];

  if (tag && page.includes("/product/")) {
    renderProducts = products.filter((product) => product.tags.includes(tag));
    console.log("renderProducts", renderProducts);
  }

  if (category && page.includes(category)) {
    const categorizedProducts = products.filter((product) => product.tags.includes(category));

    if (filters === "topSales") {
      renderProducts = categorizedProducts.sort((a, b) => b.reviews.length - a.reviews.length);
    }
    if (filters === "discountedItems") {
      renderProducts = categorizedProducts.filter((product) => product.discountedPrice !== product.price);
    }
  } else if (!tag && !category && !page.includes(category) && !page.includes("/product/")) {
    renderProducts = products;

    if (filters === "discountedItems") {
      renderProducts = products.filter((product) => product.discountedPrice !== product.price);
    }

    if (filters === "topSales") {
      console.log("products", products);
      renderProducts = products.sort((a, b) => b.reviews.length - a.reviews.length);
    }
  }

  console.log("renderProducts", renderProducts);

  return (
    <div className={styles.wrapper}>
      {renderProducts.map((product) => (
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
