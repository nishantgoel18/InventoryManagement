import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import useFetch from "../../hooks/useFetch";
import { adminOrdersList, adminDeleteOrder } from "../../api/orders";
import { SOMETHING_WENT_WRONG, showSnackbar, errorType } from "../../../utils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const STATUS_COLORS = {
  pending: "badge-warning",
  confirmed: "badge-info",
  shipped: "badge-primary",
  delivered: "badge-success",
  cancelled: "badge-danger",
};

const OrdersList = () => {
  const { apiData, isLoading, refetch } = useFetch(adminOrdersList, {});
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order? Inventory will be restored."))
      return;
    setDeleting(id);
    try {
      await adminDeleteOrder(id);
      refetch();
    } catch (e) {
      showSnackbar(e || SOMETHING_WENT_WRONG, errorType);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-2 text-gray-800">Orders</h1>
          <p className="mb-4">Manage your orders</p>
        </div>
        <Link to="/orders/new" className="btn btn-primary">
          + Create Order
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          {isLoading ? (
            <p>Loading orders...</p>
          ) : (
            <div className="table-responsive">
              {apiData.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiData.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer?.name || "—"}</td>
                        <td>{order.items?.length || 0} item(s)</td>
                        <td>₹{order.total}</td>
                        <td>
                          <span
                            className={`badge ${STATUS_COLORS[order.status] || "badge-secondary"}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          {new Date(order.created_at).toLocaleDateString(
                            "en-IN",
                          )}
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 6 }}>
                            <Link
                              to={`/orders/${order.id}`}
                              className="btn btn-info btn-sm action-btn"
                            >
                              <VisibilityIcon />
                            </Link>
                            <Link
                              to={`/orders/${order.id}/edit`}
                              className="btn btn-warning btn-sm action-btn"
                            >
                              <EditIcon />
                            </Link>
                            <button
                              onClick={() => handleDelete(order.id)}
                              disabled={deleting === order.id}
                              className="btn btn-danger btn-sm action-btn"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No orders found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrdersList;
