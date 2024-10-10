import { Layout } from "./components/Layout";
import Home from "./routes/Home";
import { Product } from "./routes/ProductSpecific";
import ProductsList from "./routes/ProductsList";
import Checkout from "./routes/Checkout";
import CheckoutSuccess from "./routes/CheckoutSuccess";
import Contact from "./routes/Contact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function RouteNotFound() {
  return <div className="error">Page not found</div>;
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
