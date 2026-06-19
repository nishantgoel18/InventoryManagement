import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import useFetch from "../../hooks/useFetch";
import {
  adminCreateOrder,
  adminOrderDetails,
  adminUpdateOrderStatus,
} from "../../api/orders";
import { adminCustomersList } from "../../api/customers";
import { adminProductsList } from "../../api/products";
import {
  SOMETHING_WENT_WRONG,
  showSnackbar,
  errorType,
  ok,
} from "../../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const OrdersForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [saving, setSaving] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [status, setStatus] = useState("pending");
  const [items, setItems] = useState([{ product_id: "", quantity: 1 }]);

  const { apiData: customersData } = useFetch(adminCustomersList, {});
  const { apiData: productsData } = useFetch(adminProductsList, {});
  const { apiData: orderData } = useFetch(
    isEdit ? adminOrderDetails : null,
    isEdit ? id : null,
  );

  const customers = customersData || [];
  const products = productsData || [];

  // prefill on edit
  useEffect(() => {
    if (!isEdit || !orderData) return;
    const o = orderData;
    setCustomerId(o.customer_id || "");
    setStatus(o.status || "pending");
    setItems(
      o.items?.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })) || [{ product_id: "", quantity: 1 }],
    );
  }, [orderData]);

  const handleItemChange = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const addItem = () => {
    setItems((prev) => [...prev, { product_id: "", quantity: 1 }]);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const getProductStock = (productId) => {
    const product = products.find((p) => p.id === Number(productId));
    return product?.inventory?.quantity ?? "—";
  };

  const calculateTotal = () => {
    return items
      .reduce((total, item) => {
        const product = products.find((p) => p.id === Number(item.product_id));
        if (!product) return total;
        return total + parseFloat(product.price) * Number(item.quantity);
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId) return showSnackbar("Please select a customer", errorType);

    const validItems = items.filter((i) => i.product_id && i.quantity > 0);
    if (validItems.length === 0)
      return showSnackbar("Add at least one item", errorType);

    setSaving(true);
    try {
      if (isEdit) {
        await adminUpdateOrderStatus(id, status);
      } else {
        await adminCreateOrder({
          customer_id: Number(customerId),
          items: validItems.map((i) => ({
            product_id: Number(i.product_id),
            quantity: Number(i.quantity),
          })),
        });
      }
      showSnackbar("Order saved!", ok);
      navigate("/orders");
    } catch (e) {
      showSnackbar(e || SOMETHING_WENT_WRONG, errorType);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <h1 className="h3 mb-4 text-gray-800">
        {isEdit ? "Edit Order" : "Create Order"}
      </h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Customer */}
            <div className="form-group">
              <label>Customer *</label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
                disabled={isEdit}
                className="form-control bg-light border-2 small"
              >
                <option value="">Select a customer</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.email}
                  </option>
                ))}
              </select>
              {isEdit && (
                <small className="text-muted">
                  Customer cannot be changed after order is created.
                </small>
              )}
            </div>

            {/* Status — only in edit */}
            {isEdit && (
              <div className="form-group">
                <label>Status *</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control bg-light border-2 small"
                >
                  {[
                    "pending",
                    "confirmed",
                    "shipped",
                    "delivered",
                    "cancelled",
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Order Items */}
            <div className="form-group">
              <label>Order Items *</label>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center mb-2"
                  style={{ gap: 8 }}
                >
                  <select
                    value={item.product_id}
                    onChange={(e) =>
                      handleItemChange(index, "product_id", e.target.value)
                    }
                    className="form-control bg-light border-2 small"
                    style={{ flex: 2 }}
                    disabled={isEdit}
                  >
                    <option value="">Select product</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ₹{p.price} (Stock:{" "}
                        {p.inventory?.quantity ?? "—"})
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    max={getProductStock(item.product_id)}
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className="form-control bg-light border-2 small"
                    style={{ flex: 1 }}
                    placeholder="Qty"
                    disabled={isEdit}
                  />

                  {!isEdit && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      className="btn btn-danger btn-sm"
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              ))}

              {!isEdit && (
                <button
                  type="button"
                  onClick={addItem}
                  className="btn btn-secondary btn-sm mt-2"
                >
                  <AddIcon /> Add Item
                </button>
              )}
            </div>

            {/* Total Preview */}
            {!isEdit && (
              <div className="mb-3">
                <strong>Estimated Total: ₹{calculateTotal()}</strong>
              </div>
            )}

            {isEdit && orderData?.order && (
              <div className="mb-3">
                <strong>Order Total: ₹{orderData.order.total}</strong>
              </div>
            )}

            <button
              type="submit"
              disabled={saving || !customerId}
              className="btn btn-primary"
            >
              {saving ? "Saving..." : isEdit ? "Update Order" : "Create Order"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersForm;
