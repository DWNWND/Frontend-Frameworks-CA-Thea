import { useParams } from "react-router-dom";
import { useState, createContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Product.module.css";
import Price from "../../Price";
import Ratings from "../../Ratings";
import { ProductsToDisplay } from "../../ProductCards";
import Footer from "../../Layout/Footer";
import useFetch from "../../../hooks/useFetch";

const url = "https://v2.api.noroff.dev/online-shop";

export const ProductTagContext = createContext();
export const ProductObjectContext = createContext();

export function Product() {
  let { id } = useParams();
  const { data, tag, isLoading, isError } = useFetch(url + "/" + id);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const location = useLocation();

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const product = data.data;

  function toggleDescription() {
    setDescriptionOpen(!descriptionOpen);
  }

  function toggleReviews() {
    setReviewsOpen(!reviewsOpen);
  }

  return (
    <>
      {product ? (
        <>
          <ProductTagContext.Provider value={tag}>
            <div className={styles.wrapper}>
              <div className={styles.breadcrumbs}>
                <Link to="/" className={styles.crumb}>
                  home
                </Link>{" "}
                /
                <Link to={`/products/${tag}`} className={styles.crumb}>
                  {tag}
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
                <div>
                  <div className={styles.infoHeader}>
                    <h2>Similar products</h2>
                  </div>
                  <ProductsToDisplay />
                </div>
              </div>
            </div>
          </ProductTagContext.Provider>
          <ProductObjectContext.Provider value={product}>
            <Footer page={location.pathname} />
          </ProductObjectContext.Provider>
        </>
      ) : null}
    </>
  );
}
