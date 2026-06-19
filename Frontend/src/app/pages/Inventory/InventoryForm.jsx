import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import useFetch from "../../hooks/useFetch";
import {
  adminInventoryDetails,
  adminUpdateInventory,
} from "../../api/inventory";
import {
  SOMETHING_WENT_WRONG,
  showSnackbar,
  errorType,
  ok,
} from "../../../utils";

const InventoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    quantity: "",
    low_stock_threshold: "",
  });

  const { apiData: inventoryData } = useFetch(adminInventoryDetails, id);

  useEffect(() => {
    if (!inventoryData) return;
    const inv = inventoryData;
    setForm({
      quantity: inv.quantity ?? "",
      low_stock_threshold: inv.low_stock_threshold ?? "",
    });
  }, [inventoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminUpdateInventory(id, {
        quantity: Number(form.quantity),
        low_stock_threshold: Number(form.low_stock_threshold),
      });
      showSnackbar("Inventory updated!", ok);
      navigate("/inventory");
    } catch (e) {
      showSnackbar(e || SOMETHING_WENT_WRONG, errorType);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <h1 className="h3 mb-4 text-gray-800">Edit Inventory</h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          {inventoryData && (
            <div className="mb-4">
              <p className="mb-1">
                <strong>Product:</strong> {inventoryData.product?.name || "—"}
              </p>
              <p className="mb-1">
                <strong>SKU:</strong> {inventoryData.product?.sku || "—"}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Quantity *</label>
              <input
                name="quantity"
                type="number"
                min="0"
                value={form.quantity}
                onChange={handleChange}
                required
                className="form-control bg-light border-2 small"
                placeholder="Current stock quantity"
              />
            </div>

            <div className="form-group">
              <label>Low Stock Threshold *</label>
              <input
                name="low_stock_threshold"
                type="number"
                min="0"
                value={form.low_stock_threshold}
                onChange={handleChange}
                required
                className="form-control bg-light border-2 small"
                placeholder="Alert when stock falls below this"
              />
            </div>

            <button
              type="submit"
              disabled={saving || form.quantity === ""}
              className="btn btn-primary"
            >
              {saving ? "Saving..." : "Update Inventory"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default InventoryForm;
