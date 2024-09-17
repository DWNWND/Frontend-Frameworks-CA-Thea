import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Theme from "./styles/theme.jsx";
import GlobalStyle from "./styles/globalStyle.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </Theme>
  </StrictMode>
);
