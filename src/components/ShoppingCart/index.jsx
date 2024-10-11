import styles from "./ShoppingCart.module.css";
import { useLocation, useOutletContext } from "react-router-dom";
import useScreenSizeCheck from "../../hooks/useScreenSizeCheck";
import { ProductsInCart } from "../Products/index.jsx";
import { SumTotal, Button } from "../";
import { useCartStore } from "../../stores/useCartStore.js";

//"setCart" removed from useOutletContext
export function ShoppingCart() {
  const { totalSum, setTotalSum } = useOutletContext();
  const isMobile = useScreenSizeCheck();
  const location = useLocation();
  const page = location.pathname;
  // let newProductsArray = [];

  const { cartItems } = useCartStore();


  // function checkProductQuantity() {
  //   const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
  //   if (shoppingCart) {
  //     newProductsArray = shoppingCart.filter((product) => product.quantity > 0);
  //     localStorage.setItem("shopping-cart", JSON.stringify(newProductsArray));
  //   }
  // }

  // checkProductQuantity();

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
              {/* <Button page={page} setCart={setCart}></Button> */}
            </>
          )}
        </>
      ) : (
        <div>Your shopping cart is empty.</div>
      )}
    </>
  );
}
