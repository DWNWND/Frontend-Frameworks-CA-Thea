import styles from "./Button.module.css";

export default function Button({ page }) {
  var btnClass;
  var btnText;

  if (page.includes("/product/")) {
    btnClass = styles.addToCart;
    btnText = "Add to cart";
  }
  if (page.includes("/checkout")) {
    btnClass = styles.checkout;
    btnText = "checkout";
  }
  if (page.includes("/success")) {
    btnClass = styles.continueShopping;
    btnText = "continue shopping";
  }
  if (page.includes("/contact")) {
    btnClass = styles.sendInquiry;
    btnText = "send inquiry";
  } 

  return <button className={`${btnClass} ${styles.button}`}>{btnText}</button>;
}
