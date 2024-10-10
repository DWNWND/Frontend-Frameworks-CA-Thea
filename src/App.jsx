import { Layout } from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, ProductSpesific, ProductsList, Checkout, CheckoutSuccess, Contact, RouteNotFound } from "./routes";

//recreated router according to this source: https://reactrouter.com/en/main/upgrading/v6-data

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products/:category", element: <ProductsList /> },
      { path: "product/:id", element: <ProductSpesific /> },
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
