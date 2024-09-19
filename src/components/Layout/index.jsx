import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header/index.jsx";
import Footer from "./Footer/index.jsx";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    console.log("Location changed");
    console.log(location);
  }, [location]);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer page={location.pathname} />
    </div>
  );
}
