import styles from "./BannerCommercial.module.css";

export default function BannerCommercial() {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.headLine}>Flash Sale!</h1>
          <h2 className={styles.tagLine}>Up to 50% Off – Shop Now!</h2>
        </div>
      </section>
    </>
  );
}
