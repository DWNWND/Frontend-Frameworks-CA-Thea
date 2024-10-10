import { Link, useLocation, useOutletContext, useParams } from "react-router-dom";
import styles from "./ProductCards.module.css";
import { Price, Ratings, Filters } from "../../index.jsx";

export function ProductList({ tag }) {
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
      renderProducts = products.sort((a, b) => b.reviews.length - a.reviews.length);
    }
  }

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
