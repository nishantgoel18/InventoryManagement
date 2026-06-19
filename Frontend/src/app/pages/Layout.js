import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Layout({ children }) {
  const currentPage = window.location.pathname;

  const sidebarActiveTab = () => {
    if (currentPage.startsWith("/inventory")) {
      return "inventory";
    } else if (currentPage.startsWith("/products")) {
      return "products";
    } else if (currentPage.startsWith("/customers")) {
      return "customers";
    } else if (currentPage.startsWith("/orders")) {
      return "orders";
    } else if (currentPage.startsWith("/home")) {
      return "home";
    }
  };
  return (
    <>
      <div id="wrapper">
        <Sidebar activeTab={sidebarActiveTab()} />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">{children}</div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
