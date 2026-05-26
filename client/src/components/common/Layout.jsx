import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      {children}
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </>
  );
};

export default Layout;
