import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Theme from "./styles/theme.jsx";
import GlobalStyle from "./styles/globalStyle.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <GlobalStyle />
      <App />
    </Theme>
  </StrictMode>,
);
