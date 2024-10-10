import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./Checkout.module.css";
import ShoppingCart from "../../components/ShoppingCart";

export function Checkout() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Checkout | Lazz</title>
      </Helmet>
      <main className={styles.container}>
        <h1>Checkout</h1>
        <ShoppingCart />
      </main>
    </HelmetProvider>
  );
}
