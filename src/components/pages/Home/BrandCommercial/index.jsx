import styles from "./BrandCommercial.module.css";

export default function BrandCommercial() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoContainer}>
          <h2>Some nice title text</h2>
          <p>Some slogan thing</p>
        </div>
      </div>
    </>
  );
}
