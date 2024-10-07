import styles from "./Ratings.module.css";

function ReviewLength({ section, reviews }) {
  if (section === "reviews") {
    return <></>;
  } else {
    return <p className={styles.reviewsCount}>({reviews.length})</p>;
  }
}

export default function Ratings({ rating, reviews, section }) {
  if (rating < 1) {
    return (
      <div className={styles.ratings}>
        <p className={styles.star}>☆ ☆ ☆ ☆ ☆</p>
        <ReviewLength section={section} reviews={reviews} />
      </div>
    );
  }
  if (rating >= 1 && rating < 2) {
    return (
      <div className={styles.ratings}>
        <p className={styles.star}>★ ☆ ☆ ☆ ☆</p>
        <ReviewLength section={section} reviews={reviews} />
      </div>
    );
  }
  if (rating >= 2 && rating < 3) {
    return (
      <div className={styles.ratings}>
        <p className={styles.star}>★ ★ ☆ ☆ ☆</p>
        <ReviewLength section={section} reviews={reviews} />
      </div>
    );
  }
  if (rating >= 3 && rating < 4) {
    return (
      <div className={styles.ratings}>
        <p className={styles.star}>★ ★ ★ ☆ ☆</p>
        <ReviewLength section={section} reviews={reviews} />
      </div>
    );
  }
  if (rating >= 4 && rating < 5) {
    return (
      <div className={styles.ratings}>
        <p className={styles.star}>★ ★ ★ ★ ☆</p>
        <ReviewLength section={section} reviews={reviews} />
      </div>
    );
  }
  if (rating >= 5) {
    return (
      <div className={styles.ratings}>
        <p className={styles.star}>★ ★ ★ ★ ★</p>
        <ReviewLength section={section} reviews={reviews} />
      </div>
    );
  }
}
