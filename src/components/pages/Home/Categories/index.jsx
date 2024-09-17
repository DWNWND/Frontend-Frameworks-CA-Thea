import styles from "./Categories.module.css";

export default function Categories() {
  return (
    <>
      <ul className={styles.wrapper}>
        <a className={styles.categoryElement}>
          <li>Electronics</li>
        </a>
        <a className={styles.categoryElement}>
          <li>Beauty</li>
        </a>
        <a className={styles.categoryElement}>
          <li>Audio</li>
        </a>
        <a className={styles.categoryElement}>
          <li>Watches</li>
        </a>
        <a className={styles.categoryElement}>
          <li>Fashion</li>
        </a>
        <a className={styles.categoryElement}>
          <li>Shoes</li>
        </a>
      </ul>
    </>
  );
}
