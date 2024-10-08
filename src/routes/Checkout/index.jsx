import { useLocation, useOutletContext, Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./Checkout.module.css";
import useScreenSizeCheck from "../../hooks/useScreenSizeCheck.jsx";
import Price from "../../components/Price";
import Ratings from "../../components/Ratings";
import Quantity from "../../components/Quantity";
import Button from "../../components/Button";
import SumTotal from "../../components/SumTotal";

export default function Checkout() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Checkout | Lazz</title>
      </Helmet>
      <div className={styles.container}>
        <h1>Checkout</h1>
        <ShoppingCart />
      </div>
    </HelmetProvider>
  );
}

function ShoppingCart() {
  const { setCart, totalSum, setTotalSum } = useOutletContext();
  const isMobile = useScreenSizeCheck();
  const location = useLocation();
  const page = location.pathname;
  let newProductsArray = [];

  function checkProductQuantity() {
    const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
    if (shoppingCart) {
      newProductsArray = shoppingCart.filter((product) => product.quantity > 0);
      localStorage.setItem("shopping-cart", JSON.stringify(newProductsArray));
    }
  }

  checkProductQuantity();

  return (
    <>
      {newProductsArray.length > 0 ? (
        <>
          <section className={styles.productsSection}>
            {newProductsArray.map((product) => (
              <ProductCartCards page={page} product={product} key={product.id}></ProductCartCards>
            ))}
          </section>
          {isMobile ? null : (
            <>
              <SumTotal totalSum={totalSum} setTotalSum={setTotalSum}></SumTotal>
              <Button page={page} setCart={setCart}></Button>
            </>
          )}
        </>
      ) : (
        <div>Your shopping cart is empty.</div>
      )}
    </>
  );
}

function ProductCartCards({ product, page }) {
  return (
    <>
      {product ? (
        <div className={styles.productCard}>
          <Link to={`/product/${product.id}`} className={styles.imageWrapper}>
            <img src={product.image.url} alt={product.image.alt}></img>
          </Link>
          <div className={styles.productInfo}>
            <Link to={`/product/${product.id}`} className={styles.productTitle}>
              <h2>{product.title}</h2>
            </Link>
            <div className={styles.priceRatingQuantityContainer}>
              <div className={styles.priceRatingContainer}>
                <Price originalPrice={product.price} discountedPrice={product.discountedPrice} page="/checkout/" view="listView"></Price>
                <Ratings rating={product.rating} reviews={product.reviews} section=""></Ratings>
              </div>
              <div className={styles.quantityWrapper}>
                <Quantity page={page} product={product}></Quantity>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
