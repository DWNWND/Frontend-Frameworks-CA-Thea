import styles from "./Ratings.module.css";

const star = "★";
const noStar = "☆";

function ReviewLength({ section, reviews }) {
  if (section === "reviews") {
    return <></>;
  } else {
    return <p className={styles.reviewsCount}>({reviews.length})</p>;
  }
}

export default function Ratings({ rating, reviews, section }) {
  let stars = "";

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars += star;
    } else {
      stars += noStar;
    }
  }
  return (
    <div className={styles.ratings}>
      <p className={styles.star}>{stars ? stars : null}</p>
      <ReviewLength section={section} reviews={reviews} />
    </div>
  );
}
