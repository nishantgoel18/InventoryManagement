import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import useFetch from "../../hooks/useFetch";
import { adminInventoryList } from "../../api/inventory";
import EditIcon from "@mui/icons-material/Edit";

const InventoryList = () => {
  const { apiData, isLoading } = useFetch(adminInventoryList, {});

  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-2 text-gray-800">Inventory</h1>
          <p className="mb-4">Manage stock levels</p>
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          {isLoading ? (
            <p>Loading inventory...</p>
          ) : (
            <div className="table-responsive">
              {apiData?.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Quantity</th>
                      <th>Low Stock Threshold</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.product?.name || "—"}</td>
                        <td>{item.product?.sku || "—"}</td>
                        <td
                          style={{
                            color: item.is_low_stock ? "#e74c3c" : "inherit",
                            fontWeight: item.is_low_stock ? 600 : 400,
                          }}
                        >
                          {item.quantity} {item.is_low_stock && "⚠️"}
                        </td>
                        <td>{item.low_stock_threshold}</td>
                        <td>
                          <span
                            className={`badge ${item.is_low_stock ? "badge-danger" : "badge-success"}`}
                          >
                            {item.is_low_stock ? "Low Stock" : "In Stock"}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/inventory/${item.id}/edit`}
                            className="btn btn-warning btn-sm action-btn"
                          >
                            <EditIcon />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No inventory found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InventoryList;
