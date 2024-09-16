import styles from "./Button.module.css";

export default function Button({ onClick }) {
  function checkClass(page = "checkout-success") {
    if (page === "product") {
      return styles.addToCart;
    }
    if (page === "checkout") {
      return styles.checkout;
    }
    if (page === "checkout-success") {
      return styles.continueShopping;
    }
    if (page === "send-inquiry") {
      return styles.sendInquiry;
    }
  }

  const btnClass = checkClass();

  return <button className={`${btnClass} ${styles.button}`}>{btnClass}</button>;
}
