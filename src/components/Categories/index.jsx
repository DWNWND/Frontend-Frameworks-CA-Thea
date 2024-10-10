import styles from "./Categories.module.css";
import { Link } from "react-router-dom";

export function Categories() {
  return (
    <>
      <ul className={styles.container}>
        <Link to="/products/electronics" className={styles.categoryElement}>
          <li>Electronics</li>
        </Link>
        <Link to="/products/beauty" className={styles.categoryElement}>
          <li>Beauty</li>
        </Link>
        <Link to="/products/audio" className={styles.categoryElement}>
          <li>Audio</li>
        </Link>
        <Link to="/products/watches" className={styles.categoryElement}>
          <li>Watches</li>
        </Link>
        <Link to="/products/fashion" className={styles.categoryElement}>
          <li>Fashion</li>
        </Link>
        <Link to="/products/shoes" className={styles.categoryElement}>
          <li>Shoes</li>
        </Link>
      </ul>
    </>
  );
}
