import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function Home() {
  return <div>Home</div>;
}

function Product() {
  return <div>Product</div>;
}

function Checkout() {
  return <div>Checkout</div>;
}

function CheckoutSuccess() {
  return <div>success</div>;
}

function Contact() {
  return <div>Contact</div>;
}

function RouteNotFound() {
  return <div>Page not found</div>;
}


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
