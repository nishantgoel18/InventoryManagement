import React from "react";

import { Link, useNavigate } from "react-router-dom";
import RoutesList from "../../constants/RoutesList";

import { logo } from "../../constants/Images";

const Sidebar = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link
        to={RoutesList.home}
        className="sidebar-brand d-flex align-items-center justify-content-center"
      >
        <div
          className="sidebar-brand-icon"
          style={{
            height: "65px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <h2>Home</h2>
        </div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <li
        className={`nav-item ${activeTab === "home" ? "active" : "inactive"}`}
      >
        <Link to={RoutesList.home} className="nav-link">
          <span style={{ paddingTop: 10 }}> Dashboard</span>
        </Link>
      </li>
      <li className={`nav-item ${activeTab === "customers" ? "active" : ""}`}>
        <Link to={RoutesList.customers} className="nav-link">
          <span style={{ paddingTop: 10 }}> Customers</span>
        </Link>
      </li>
      <li className={`nav-item ${activeTab === "orders" ? "active" : ""}`}>
        <Link to={RoutesList.orders} className="nav-link">
          <span style={{ paddingTop: 10 }}> Orders</span>
        </Link>
      </li>
      <li className={`nav-item ${activeTab === "products" ? "active" : ""}`}>
        <Link to={RoutesList.products} className="nav-link">
          <span style={{ paddingTop: 10 }}> Products</span>
        </Link>
      </li>
      <li className={`nav-item ${activeTab === "inventory" ? "active" : ""}`}>
        <Link to={RoutesList.inventory} className="nav-link">
          <span style={{ paddingTop: 10 }}> Inventory</span>
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
