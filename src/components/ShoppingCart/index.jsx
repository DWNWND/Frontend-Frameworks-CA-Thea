import styles from "./ShoppingCart.module.css";
import { useLocation, useOutletContext } from "react-router-dom";
import useScreenSizeCheck from "../../hooks/useScreenSizeCheck";
import ProductsInCart from "../ProductCards/ProductsInCart";
import SumTotal from "../SumTotal";
import Button from "../Button";

export default function ShoppingCart() {
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
              <ProductsInCart page={page} product={product} key={product.id}></ProductsInCart>
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
