import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import caseFirstLetter from "../../js/caseFirstLetter.js";
import { ThisProductContext } from "../../routes/ProductSpesific/index.jsx";

export default function BreadCrumbs({ tag }) {
  const category = caseFirstLetter(tag);
  const thisProduct = useContext(ThisProductContext);

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.crumb}>
        Home
      </Link>{" "}
      /
      <Link to={`/products/${tag}`} className={styles.crumb}>
        {category}
      </Link>{" "}
      / <div className={styles.active}>{thisProduct.title}</div>
    </div>
  );
}
