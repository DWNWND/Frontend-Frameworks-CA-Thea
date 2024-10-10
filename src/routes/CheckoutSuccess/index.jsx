import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./CheckoutSuccess.module.css";
import Summary from "../../components/ProductCards/ProductsSummary";

export default function CheckoutSuccess() {
  const purchasedProducts = JSON.parse(sessionStorage.getItem("receipt"));
  let paidTotal;

  if (purchasedProducts) {
    let destructuredReceipt = [...purchasedProducts];

    paidTotal = destructuredReceipt.reduce((paid, product) => {
      paid += product.discountedPrice * product.quantity;
      const rounded = Math.round(paid * 100) / 100;
      return rounded;
    }, 0);
  } else {
    paidTotal = 0;
  }

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Summary | Order successful</title>
      </Helmet>
      <main className={styles.container}>
        <div className={styles.successMessage}>
          <h1>Thank you for your order</h1>
          <p>TOTAL PAID: kr {paidTotal}</p>
        </div>
        {purchasedProducts ? <Summary purchase={purchasedProducts} /> : null}
      </main>
    </HelmetProvider>
  );
}
