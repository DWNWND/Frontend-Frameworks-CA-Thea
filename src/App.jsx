import { Layout } from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as route from "./routes";

//recreated router according to this source: https://reactrouter.com/en/main/upgrading/v6-data

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <route.Home /> },
      { path: "products/:category", element: <route.ProductsList /> },
      { path: "product/:id", element: <route.ProductSpesific /> },
      { path: "checkout", element: <route.Checkout /> },
      { path: "success", element: <route.CheckoutSuccess /> },
      { path: "contact", element: <route.Contact /> },
      { path: "*", element: <route.RouteNotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
