import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Theme from "./styles/theme.jsx";
import GlobalStyle from "./styles/globalStyle.jsx";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{ path: "*", element: <App /> }]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <RouterProvider router={router} />
      {/* <BrowserRouter> */}
      <GlobalStyle />
      {/* <App /> */}
      {/* </BrowserRouter> */}
      {/* </RouterProvider> */}
    </Theme>
  </StrictMode>
);
