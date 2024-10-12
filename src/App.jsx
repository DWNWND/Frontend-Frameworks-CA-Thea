import { Layout } from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as routes from "./routes";

//recreated router according to this source: https://reactrouter.com/en/main/upgrading/v6-data

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <routes.Home /> },
      { path: "products/:category", element: <routes.ProductsList /> },
      { path: "product/:id", element: <routes.ProductSpesific /> },
      { path: "checkout", element: <routes.Checkout /> },
      { path: "success", element: <routes.CheckoutSuccess /> },
      { path: "contact", element: <routes.Contact /> },
      { path: "*", element: <routes.RouteNotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
