import ProductCards from "../../ProductCards";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <h1>Home</h1>
      <ProductCards />
    </div>
  );
}
