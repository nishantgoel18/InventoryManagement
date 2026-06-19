import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import useFetch from "../../hooks/useFetch";
import {
  adminProductDetails,
  adminCreateProduct,
  adminUpdateProduct,
} from "../../api/products";
import { getImageUrl } from "../../api/util";
import {
  SOMETHING_WENT_WRONG,
  showSnackbar,
  errorType,
  ok,
} from "../../../utils";

const ProductsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    sku: "",
    file: null,
  });

  const { apiData: productData } = useFetch(
    isEdit ? adminProductDetails : null,
    isEdit ? id : null,
  );

  useEffect(() => {
    if (!isEdit || !productData) return;
    const p = productData;
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price || "",
      sku: p.sku || "",
      file: null,
    });
    if (p.image) setImagePreview(getImageUrl(p.image));
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("sku", form.sku);
      if (form.file) formData.append("file", form.file);

      if (isEdit) {
        await adminUpdateProduct(id, formData);
      } else {
        await adminCreateProduct(formData);
      }
      showSnackbar("Product saved!", ok);
      navigate("/products");
    } catch (e) {
      showSnackbar(e || SOMETHING_WENT_WRONG, errorType);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <h1 className="h3 mb-4 text-gray-800">
        {isEdit ? "Edit Product" : "Create Product"}
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
                placeholder="Product name"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control bg-light border-2 small"
                placeholder="Product description"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Price *</label>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
                className="form-control bg-light border-2 small"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>SKU</label>
              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                className="form-control bg-light border-2 small"
                placeholder="Unique product code"
              />
            </div>

            <div className="form-group">
              <label>Product Image</label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="form-control-file"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={saving || !form.name.trim() || !form.price}
              className="btn btn-primary"
            >
              {saving
                ? "Saving..."
                : isEdit
                  ? "Update Product"
                  : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsForm;
