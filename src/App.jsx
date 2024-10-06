import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./components/pages/Home";
import { Product } from "./components/pages/ProductSpecific";
import ProductsList from "./components/pages/ProductsList";
import Checkout from "./components/pages/Checkout";
import CheckoutSuccess from "./components/pages/CheckoutSuccess";
import Contact from "./components/pages/Contact";
import ScrollToTop from "./scrollToTop";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function RouteNotFound() {
  return <div>Page not found</div>;
}

//recreated router according to this source: https://reactrouter.com/en/main/upgrading/v6-data

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products/:category", element: <ProductsList /> },
      { path: "product/:id", element: <Product /> },
      { path: "checkout", element: <Checkout /> },
      { path: "success", element: <CheckoutSuccess /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <RouteNotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
