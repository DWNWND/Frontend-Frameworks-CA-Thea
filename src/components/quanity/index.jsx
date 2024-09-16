import styles from "./Quantity.module.css";

export default function Quantity({ quantity }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>quantity:</div>
      <div className={styles.bullet}>
        <button className={styles.minus}>
          <div>&#45;</div>
        </button>
        <span className={styles.amount}>{quantity}1</span>
        <button className={styles.pluss}>&#43;</button>
      </div>
    </div>
  );
}
