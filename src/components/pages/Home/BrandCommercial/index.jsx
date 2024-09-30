import styles from "./BrandCommercial.module.css";

export default function BrandCommercial() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoContainer}>
          <h2>Flash Sale!</h2>
          <p>Up to 50% Off – Shop Now!</p>
        </div>
      </div>
    </>
  );
}
