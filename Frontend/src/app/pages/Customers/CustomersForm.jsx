import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import useFetch from "../../hooks/useFetch";
import {
  adminCustomerDetails,
  adminCreateCustomer,
  adminUpdateCustomer,
} from "../../api/customers";
import {
  SOMETHING_WENT_WRONG,
  showSnackbar,
  errorType,
  ok,
} from "../../../utils";

const CustomersForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { apiData: customerData } = useFetch(
    isEdit ? adminCustomerDetails : null,
    isEdit ? id : null,
  );

  useEffect(() => {
    if (!isEdit || !customerData) return;
    const c = customerData;
    setForm({
      name: c.name || "",
      email: c.email || "",
      phone: c.phone || "",
    });
  }, [customerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await adminUpdateCustomer(id, form);
      } else {
        await adminCreateCustomer(form);
      }
      showSnackbar("Customer saved!", ok);
      navigate("/customers");
    } catch (e) {
      showSnackbar(e || SOMETHING_WENT_WRONG, errorType);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <h1 className="h3 mb-4 text-gray-800">
        {isEdit ? "Edit Customer" : "Create Customer"}
      </h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="form-control bg-light border-2 small"
                placeholder="Customer name"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="form-control bg-light border-2 small"
                placeholder="customer@email.com"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control bg-light border-2 small"
                placeholder="Phone number"
              />
            </div>

            <button
              type="submit"
              disabled={saving || !form.name.trim() || !form.email.trim()}
              className="btn btn-primary"
            >
              {saving
                ? "Saving..."
                : isEdit
                  ? "Update Customer"
                  : "Create Customer"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CustomersForm;
