import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} from "../../../redux/apiSlice";
import { Loader } from "../../SharedComponent/Loader";
import Swal from "sweetalert2";
import showToast from "../../../utils/ShowToast";

export default function ManageFood() {
  const navigate = useNavigate();
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();

  const [deleteProduct] = useDeleteProductMutation();
  const [deletingId, setDeletingId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This food item will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });
    if (!confirm.isConfirmed) return;
    setDeletingId(id);
    try {
      await deleteProduct(id).unwrap();
      showToast({ title: "Deleted successfully!", icon: "success" });
    } catch {
      showToast({ title: "Failed to delete!", icon: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return <Loader comp_Name={"Foods"} />;
  }

  if (isError)
    return (
      <p className="p-8 text-center text-red-600">Error: {error.toString()}</p>
    );

  //  Filtered products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-16 md:mt-8">
      <h1 className="text-3xl font-bold my-6 font-inknut">Manage Food Items</h1>

      {/*  Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/3"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/*  Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-serif">Image</th>
              <th className="px-6 py-3 text-left font-serif">Title</th>
              <th className="px-6 py-3 text-left font-serif">Category</th>
              <th className="px-6 py-3 text-left font-serif">Price</th>
              <th className="px-6 py-3 text-center font-serif">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="font-serif">
                <td className="px-6 py-4">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded shadow"
                  />
                </td>
                <td className="px-6 py-4">{product.title}</td>
                <td className="px-6 py-4">{product.category?.name || "—"}</td>
                <td className="px-6 py-4 font-inter">
                  ৳{(product.sizes?.[0]?.price || 0).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center space-x-2 space-y-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/dashboard/manage-food/edit-food/${product._id}`,
                        {
                          state: { product },
                        }
                      )
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 font-serif cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 font-serif cursor-pointer"
                  >
                    {deletingId === product._id ? "Deleting…" : "Delete"}
                  </button>
                </td>
              </tr>
            ))}

            {/* No matching result */}
            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-gray-500 font-serif"
                >
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
