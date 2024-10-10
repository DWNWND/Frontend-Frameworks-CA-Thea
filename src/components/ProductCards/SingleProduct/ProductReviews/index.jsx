import { useState, useContext } from "react";
import { ThisProductContext } from "../../../../routes/ProductSpesific/index.jsx";
import styles from "./ProductReviews.module.css";
import Ratings from "../../../Ratings/index.jsx";

export default function ProductReviews() {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const thisProduct = useContext(ThisProductContext);

  function toggleReviews() {
    setReviewsOpen(!reviewsOpen);
  }

  return (
    <div>
      <div className={styles.infoHeader} onClick={() => toggleReviews()}>
        <h2>Reviews ({thisProduct.reviews.length})</h2>
        <div className={styles.arrowContainer}>
          <div className={`${styles.arrow} ${reviewsOpen ? styles.down : styles.up}`}></div>
        </div>
      </div>
      <div className={`${styles.reviewsContainer} ${styles.content} ${reviewsOpen ? styles.open : styles.hidden}`}>
        <Reviews></Reviews>
      </div>
    </div>
  );
}

function Reviews() {
  const thisProduct = useContext(ThisProductContext);

  return (
    <>
      {thisProduct.reviews.map((review) => {
        return (
          <div key={review.id} className={styles.reviewWrapper}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewUser}>{review.username}</div>
              <Ratings rating={review.rating} reviews={1} section="reviews"></Ratings>
            </div>
            <p>{review.description}</p>
          </div>
        );
      })}
    </>
  );
}
