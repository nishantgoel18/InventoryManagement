import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import ListingTable from "../../components/ListingTable/ListingTable";
import useFetch from "../../hooks/useFetch";
import { adminCustomersList, adminDeleteCustomer } from "../../api/customers";
import { SOMETHING_WENT_WRONG, showSnackbar, errorType } from "../../../utils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomersList = () => {
  const { apiData, isLoading, refetch } = useFetch(adminCustomersList, {});
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    setDeleting(id);
    try {
      await adminDeleteCustomer(id);
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone || "—",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: 6 }}>
          <Link
            to={`/customers/${row.id}/edit`}
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
          <h1 className="h3 mb-2 text-gray-800">Customers</h1>
          <p className="mb-4">Manage your customers</p>
        </div>
        <Link to="/customers/new" className="btn btn-primary">
          + Add Customer
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          {isLoading ? (
            <p>Loading customers...</p>
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
                <p>No customers found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CustomersList;
