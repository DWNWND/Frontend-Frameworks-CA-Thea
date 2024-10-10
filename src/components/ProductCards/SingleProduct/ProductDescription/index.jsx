import { useState, useContext } from "react";
import { ThisProductContext } from "../../../../routes/ProductSpecific/index.jsx";
import styles from "./ProductDescription.module.css";

export default function ProductDescription() {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const thisProduct = useContext(ThisProductContext);

  function toggleDescription() {
    setDescriptionOpen(!descriptionOpen);
  }

  return (
    <div>
      <div className={styles.infoHeader} onClick={() => toggleDescription()}>
        <h2>Description</h2>
        <div className={styles.arrowContainer}>
          <div className={`${styles.arrow} ${descriptionOpen ? styles.down : styles.up}`}></div>
        </div>
      </div>
      <p className={`${styles.content} ${descriptionOpen ? styles.open : styles.hidden}`}>{thisProduct.description}</p>
    </div>
  );
}
