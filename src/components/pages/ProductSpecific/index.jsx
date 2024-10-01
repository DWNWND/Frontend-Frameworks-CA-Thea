import { useState, useEffect } from "react";
import { Link, useLocation, useOutletContext, useParams } from "react-router-dom";
import styles from "./ProductSpecific.module.css";
import Price from "../../Price/index.jsx";
import Ratings from "../../Ratings/index.jsx";
import { ProductsToDisplay } from "../../ProductCards/index.jsx";
import useFetch from "../../../hooks/useFetch.jsx";
import Button from "../../Button/index.jsx";
import checkIfMobileScreen from "../../../checkIfMobileScreen.js";

const url = "https://v2.api.noroff.dev/online-shop";

export function Product() {
  let { id } = useParams();
  const { product, setProduct, cart, setCart } = useOutletContext();

  const { data, tag, isLoading, isError } = useFetch(url + "/" + id);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const location = useLocation();
  const thisProduct = data.data;
  const page = location.pathname;

  useEffect(() => {
    setProduct(thisProduct);
  }, [data]);

  const isMobile = checkIfMobileScreen();

  if (isLoading || !data) {
    return <div className="loader">Loading product . . .</div>;
  }

  if (isError) {
    return <div className="error">Error loading data</div>;
  }

  function toggleDescription() {
    setDescriptionOpen(!descriptionOpen);
  }

  function toggleReviews() {
    setReviewsOpen(!reviewsOpen);
  }

  return (
    <>
      {thisProduct ? (
        <>
          <div className={styles.wrapper}>
            <div className={styles.breadcrumbs}>
              <Link to="/" className={styles.crumb}>
                home
              </Link>{" "}
              /
              <Link to={`/products/${tag}`} className={styles.crumb}>
                {tag}
              </Link>{" "}
              / <div className={styles.active}>{thisProduct.title}</div>
            </div>
            <div className={styles.productContainer}>
              <div className={styles.imageWrapper}>
                <img src={thisProduct.image.url} alt={thisProduct.image.alt}></img>
              </div>
              {isMobile ? (
                <div className={styles.productInfoContainer}>
                  <div className={styles.infoWrapper}>
                    <h1>{thisProduct.title}</h1>
                    <div className={styles.likeShareWrapper}>
                      <div>Like</div>
                      <div>Share</div>
                    </div>
                  </div>
                  <div className={styles.infoWrapper}>
                    <Price originalPrice={thisProduct.price} discountedPrice={thisProduct.discountedPrice} page={page} view="productSpesificView"></Price>
                    <Ratings rating={thisProduct.rating} reviews={thisProduct.reviews} section=""></Ratings>
                  </div>
                </div>
              ) : (
                <div className={styles.productInfoContainer}>
                  <div className={styles.flexWrapper}>
                    <div className={styles.infoWrapper1}>
                      <h1>{thisProduct.title}</h1>
                      <div className={styles.likeShareWrapper}>
                        <div>Like</div>
                        <div>Share</div>
                      </div>
                    </div>
                    <Ratings rating={thisProduct.rating} reviews={thisProduct.reviews} section=""></Ratings>
                  </div>
                  <div className={styles.infoWrapper}>
                    <Price originalPrice={thisProduct.price} discountedPrice={thisProduct.discountedPrice} page={page} view="productSpesificView"></Price>
                  </div>
                  <Button page={page} product={product} setCart={setCart}></Button>
                </div>
              )}
            </div>
            <div className={styles.extendedInfoContainer}>
              <div className={styles.extendedInfoWrapper}>
                <div className={styles.infoHeader} onClick={() => toggleDescription()}>
                  <h2>Description</h2>
                  <div className={styles.arrowContainer}>
                    <div className={`${styles.arrow} ${descriptionOpen ? styles.down : styles.up}`}></div>
                  </div>
                </div>
                <p className={`${styles.content} ${descriptionOpen ? styles.open : styles.hidden}`}>{thisProduct.description}</p>
              </div>

              <div className={styles.extendedInfoWrapper}>
                <div className={styles.infoHeader} onClick={() => toggleReviews()}>
                  <h2>Reviews ({thisProduct.reviews.length})</h2>
                  <div className={styles.arrowContainer}>
                    <div className={`${styles.arrow} ${reviewsOpen ? styles.down : styles.up}`}></div>
                  </div>
                </div>
                <div className={`${styles.reviewsContainer} ${styles.content} ${reviewsOpen ? styles.open : styles.hidden}`}>
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
                </div>
              </div>
              <div>
                <div className={`${styles.infoHeader} ${styles.similarProductsHeader}`}>
                  <h2>Similar products</h2>
                </div>
                <ProductsToDisplay tag={tag} />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
