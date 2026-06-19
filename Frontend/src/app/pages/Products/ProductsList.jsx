import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import ListingTable from "../../components/ListingTable/ListingTable";
import useFetch from "../../hooks/useFetch";
import { adminProductsList, adminDeleteProduct } from "../../api/products";
import { SOMETHING_WENT_WRONG, showSnackbar, errorType } from "../../../utils";
import { getImageUrl } from "../../api/util";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductsList = () => {
  const { apiData, isLoading, refetch } = useFetch(adminProductsList, {});
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setDeleting(id);
    try {
      await adminDeleteProduct(id);
      refetch();
    } catch (e) {
      showSnackbar(e || SOMETHING_WENT_WRONG, errorType);
    } finally {
      setDeleting(null);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Image",
      cell: (row) =>
        row.image ? (
          <img
            src={getImageUrl(row.image)}
            alt={row.name}
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 4,
              background: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "#999",
            }}
          >
            No img
          </div>
        ),
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "SKU",
      selector: (row) => row.sku || "—",
    },
    {
      name: "Price",
      selector: (row) => `₹${row.price}`,
      sortable: true,
    },
    {
      name: "Stock",
      cell: (row) => {
        const inv = row.inventory;
        if (!inv) return "—";
        return (
          <span
            style={{
              color: inv.is_low_stock ? "#e74c3c" : "inherit",
              fontWeight: inv.is_low_stock ? 600 : 400,
            }}
          >
            {inv.quantity} {inv.is_low_stock && "⚠️"}
          </span>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: 6 }}>
          <Link
            to={`/products/${row.id}/edit`}
            className="btn btn-warning btn-sm action-btn"
          >
            <EditIcon />
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            disabled={deleting === row.id}
            className="btn btn-danger btn-sm action-btn"
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-2 text-gray-800">Products</h1>
          <p className="mb-4">Manage your products</p>
        </div>
        <Link to="/products/new" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            <div className="table-responsive">
              {apiData?.length > 0 ? (
                <ListingTable
                  columns={columns}
                  data={apiData}
                  isLoading={isLoading}
                  filterColumn="name"
                />
              ) : (
                <p>No products found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductsList;
