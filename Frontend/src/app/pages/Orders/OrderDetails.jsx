import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Layout from "../Layout";
import useFetch from "../../hooks/useFetch";
import { adminOrderDetails, adminUpdateOrderStatus } from "../../api/orders";
import {
  SOMETHING_WENT_WRONG,
  showSnackbar,
  errorType,
  ok,
} from "../../../utils";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_COLORS = {
  pending: "badge-warning",
  confirmed: "badge-info",
  shipped: "badge-primary",
  delivered: "badge-success",
  cancelled: "badge-danger",
};

const OrderDetails = () => {
  const { id } = useParams();
  const { apiData, isLoading, error, refetch } = useFetch(
    adminOrderDetails,
    id,
  );
  const [updating, setUpdating] = useState(false);

  const order = apiData;

  const handleStatusChange = async (e) => {
    setUpdating(true);
    try {
      await adminUpdateOrderStatus(id, e.target.value);
      showSnackbar("Status updated!", ok);
      window.location.reload();
    } catch (e) {
      showSnackbar(e || SOMETHING_WENT_WRONG, errorType);
    } finally {
      setUpdating(false);
    }
  };

  const detailRow = (title, value) => {
    return (
      <>
        <div className="small mb-1">
          <b>{title}:</b>
        </div>
        <nav className="navbar navbar-expand navbar-light bg-light mb-2">
          {value ?? "Not Available"}
        </nav>
      </>
    );
  };

  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-2 text-gray-800">Order Details</h1>
          <p className="mb-4">Showing details of Order #{id}</p>
        </div>
        <Link to={`/orders/${id}/edit`} className="btn btn-primary">
          Edit
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          {isLoading ? (
            <p>Loading data...</p>
          ) : (
            <div className="table-responsive">
              {order ? (
                <>
                  {detailRow("Order ID", order.id)}
                  {detailRow("Customer", order.customer?.name)}
                  {detailRow("Customer Email", order.customer?.email)}
                  {detailRow("Total", `₹${order.total}`)}
                  {detailRow(
                    "Created At",
                    new Date(order.created_at).toLocaleString("en-IN"),
                  )}

                  {/* Status with dropdown */}
                  <>
                    <div className="small mb-1">
                      <b>Status:</b>
                    </div>
                    <nav className="navbar navbar-expand navbar-light bg-light mb-2">
                      <span
                        className={`badge ${STATUS_COLORS[order.status]} mr-2`}
                      >
                        {order.status}
                      </span>
                      <select
                        value={order.status}
                        onChange={handleStatusChange}
                        disabled={updating}
                        className="form-control form-control-sm ml-2"
                        style={{ width: "auto" }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </nav>
                  </>

                  {/* Order Items Table */}
                  <>
                    <div className="small mb-1">
                      <b>Order Items:</b>
                    </div>
                    <nav className="navbar navbar-expand navbar-light bg-light mb-2">
                      <div
                        className="col-12"
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                      >
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items?.map((item) => (
                                <tr key={item.id}>
                                  <td>{item.product?.name || "—"}</td>
                                  <td>{item.product?.sku || "—"}</td>
                                  <td>₹{item.unit_price}</td>
                                  <td>{item.quantity}</td>
                                  <td>₹{item.subtotal}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td
                                  colSpan={4}
                                  className="text-right font-weight-bold"
                                >
                                  Total
                                </td>
                                <td className="font-weight-bold">
                                  ₹{order.total}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </nav>
                  </>
                </>
              ) : (
                <p>Order not found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
