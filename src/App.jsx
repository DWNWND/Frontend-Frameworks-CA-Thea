import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import ProductsList from "./components/pages/ProductsList";
import Checkout from "./components/pages/Checkout";
import CheckoutSuccess from "./components/pages/CheckoutSuccess";
import Contact from "./components/pages/Contact";

function RouteNotFound() {
  return <div>Page not found</div>;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products/:category" element={<ProductsList />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<CheckoutSuccess />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
