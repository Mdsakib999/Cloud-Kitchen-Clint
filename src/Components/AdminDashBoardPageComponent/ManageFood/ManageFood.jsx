import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../../redux/apiSlice";

export default function ManageFood() {
  const navigate = useNavigate();
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    setDeletingId(id);
    try {
      await deleteProduct(id).unwrap();
      alert("Deleted");
    } catch {
      alert("Failed");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) return <p className="p-8 text-center">Loading products…</p>;
  if (isError)
    return (
      <p className="p-8 text-center text-red-600">Error: {error.toString()}</p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Food Items</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4">{product.title}</td>
                <td className="px-6 py-4">{product.category?.name || "—"}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/dashboard/edit-food/${product._id}`, {
                        state: { product },
                      })
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    {deletingId === product._id ? "Deleting…" : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
            {!products.length && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
