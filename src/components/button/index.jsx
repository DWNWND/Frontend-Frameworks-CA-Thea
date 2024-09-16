import styles from "./Button.module.css";

export default function Button({ page }) {
  var btnClass;
  var btnText;

  if (page === "product") {
    btnClass = styles.addToCart;
    btnText = "Add to cart";
  }
  if (page === "checkout") {
    btnClass = styles.checkout;
    btnText = "checkout";
  }
  if (page === "checkout-success") {
    btnClass = styles.continueShopping;
    btnText = "continue shopping";
  }
  if (page === "send-inquiry") {
    btnClass = styles.sendInquiry;
    btnText = "send inquiry";
  }

  return <button className={`${btnClass} ${styles.button}`}>{btnText}</button>;
}
