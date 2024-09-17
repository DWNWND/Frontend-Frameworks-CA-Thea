import styles from "./SumTotal.module.css";

export default function SumTotal({ total }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Sumtotal</h2>
      <div className={styles.sum}>kr {total}</div>
    </div>
  );
}
