import styles from "./BannerCommercial.module.css";

export default function BannerCommercial() {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.headLine}>Flash Sale!</h2>
          <p className={styles.tagLine}>Up to 50% Off – Shop Now!</p>
        </div>
      </section>
    </>
  );
}
