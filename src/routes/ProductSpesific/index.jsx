import { useEffect, createContext } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useFetch from "../../hooks/useFetch.jsx";
import { BreadCrumbs, SingleProduct } from "../../components";
import styles from "./ProductSpecific.module.css";

const url = import.meta.env.VITE_API_BASE_URL;
export const ThisProductContext = createContext();

export function ProductSpesific() {
  let { id } = useParams();
  const { setProduct } = useOutletContext();
  const { data, tag, isLoading, isError } = useFetch(url + "/" + id);
  const thisProduct = data.data;

  useEffect(() => {
    setProduct(thisProduct);
  });

  if (isLoading || !data) {
    return <div className="loader">Loading product . . .</div>;
  }

  if (isError) {
    return <div className="error">Error loading data</div>;
  }

  return (
    <>
      <HelmetProvider>
        {thisProduct ? (
          <>
            <Helmet prioritizeSeoTags>
              <meta name="description" content="" />
              <title>{thisProduct.title} | Lazz</title>
            </Helmet>
            <ThisProductContext.Provider value={thisProduct}>
              <main className={styles.wrapper}>
                <BreadCrumbs tag={tag} />
                <SingleProduct tag={tag} />
              </main>
            </ThisProductContext.Provider>
          </>
        ) : null}
      </HelmetProvider>
    </>
  );
}
