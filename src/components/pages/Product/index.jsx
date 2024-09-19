import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import Price from "../../Price";
import Ratings from "../../Ratings";
import ProductCards from "../../ProductCards";

const url = "https://v2.api.noroff.dev/online-shop";

export default function Product() {
  const [data, setData] = useState(null);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();

  function toggleDescription() {
    setDescriptionOpen(!descriptionOpen);
  }

  function toggleReviews() {
    setReviewsOpen(!reviewsOpen);
  }

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`${url}/${id}`);
  }, [id]);

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  console.log(data);
  const product = data.data;
  const page = product.category;

  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.crumb}>
          Home
        </Link>{" "}
        /{" "}
        <Link to="/category/fashion" className={styles.crumb}>
          Fashion
        </Link>{" "}
        / <div className={styles.active}>{product.title}</div>
      </div>
      <div className={styles.imageWrapper}>
        <img src={product.image.url} alt={product.image.alt}></img>
      </div>
      <div className={styles.productInfoContainer}>
        <div className={styles.infoWrapper}>
          <h1>{product.title}</h1>
          <div className={styles.likeShareWrapper}>
            <div>Like</div>
            <div>Share</div>
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <Price originalPrice={product.price} discountedPrice={product.discountedPrice} page="/product/"></Price>
          <Ratings rating={product.rating} reviews={product.reviews} section=""></Ratings>
        </div>
      </div>
      <div className={styles.extendedInfoContainer}>
        <div className={styles.extendedInfoWrapper}>
          <div className={styles.infoHeader} onClick={() => toggleDescription()}>
            <h2>Description</h2>
            <div className={styles.arrowContainer}>
              <div className={`${styles.arrow} ${descriptionOpen ? styles.down : styles.up}`}></div>
            </div>
          </div>
          <p className={`${styles.content} ${descriptionOpen ? styles.open : styles.hidden}`}>{product.description}</p>
        </div>

        <div className={styles.extendedInfoWrapper}>
          <div className={styles.infoHeader} onClick={() => toggleReviews()}>
            <h2>Reviews ({product.reviews.length})</h2>
            <div className={styles.arrowContainer}>
              <div className={`${styles.arrow} ${reviewsOpen ? styles.down : styles.up}`}></div>
            </div>
          </div>
          <div className={`${styles.reviewsContainer} ${styles.content} ${reviewsOpen ? styles.open : styles.hidden}`}>
            {product.reviews.map((review) => {
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
          </div>
        </div>
      </div>
      <ProductCards category="fashion"></ProductCards>
    </div>
  );
}
