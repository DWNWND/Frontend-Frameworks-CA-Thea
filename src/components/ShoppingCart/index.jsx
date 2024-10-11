import styles from "./ShoppingCart.module.css";
import { useLocation, useOutletContext } from "react-router-dom";
import useScreenSizeCheck from "../../hooks/useScreenSizeCheck";
import { ProductsInCart } from "../Products/index.jsx";
import { SumTotal, Button } from "../";
import { useCartStore } from "../../stores/useCartStore.js";

export function ShoppingCart() {
  const { totalSum, setTotalSum } = useOutletContext();
  const isMobile = useScreenSizeCheck();
  const location = useLocation();
  const page = location.pathname;
  const { cartItems } = useCartStore();

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <section className={styles.productsSection}>
            {cartItems.map((product) => (
              <ProductsInCart page={page} product={product} key={product.id}></ProductsInCart>
            ))}
          </section>
          {isMobile ? null : (
            <>
              <SumTotal totalSum={totalSum} setTotalSum={setTotalSum}></SumTotal>
              <Button page={page}></Button>
            </>
          )}
        </>
      ) : (
        <div>Your shopping cart is empty.</div>
      )}
    </>
  );
}
