import { useContext } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { ThisProductContext } from "../../../routes/ProductSpecific/index.jsx";
import useScreenSizeCheck from "../../../hooks/useScreenSizeCheck.jsx";
import styles from "./SingleProduct.module.css";
import Button from "../../Button/index.jsx";
import Price from "../../Price/index.jsx";
import Ratings from "../../Ratings/index.jsx";
import ProductDescription from "./ProductDescription/index.jsx";
import ProductReviews from "./ProductReviews/index.jsx";
import SimilarProducts from "./SimilarProducts/index.jsx";

export default function SingleProduct({ tag }) {
  const { product, setCart } = useOutletContext();
  const thisProduct = useContext(ThisProductContext);

  const location = useLocation();
  const page = location.pathname;
  const isMobile = useScreenSizeCheck();

  return (
    <>
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
        <ProductDescription />
        <ProductReviews />
        <SimilarProducts tag={tag} />
      </div>
    </>
  );
}
