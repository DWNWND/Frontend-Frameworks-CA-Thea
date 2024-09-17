import { Outlet } from "react-router-dom";
import Header from "./Header/index.jsx";
import Footer from "./Footer/index.jsx";

export default function Layout() {
  const currentPage = window.location.pathname;

  return (
    <div>
      <Header />
      <Outlet />
      <Footer page={currentPage} />
    </div>
  );
}
