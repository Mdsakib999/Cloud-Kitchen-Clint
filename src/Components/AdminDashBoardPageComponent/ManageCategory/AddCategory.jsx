import { useState } from "react";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { Check } from "lucide-react";
import showToast from "../../../utils/ShowToast";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../redux/apiSlice";
import Swal from "sweetalert2";
import { EditCategoryModal } from "./EditCategoryModal";
import { ImageUploader } from "../../SharedComponent/ImageUploader";

export const AddCategory = () => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [categoryName, setCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      const imageFile = newCategoryImage;

      await addCategory({
        name: categoryName.toUpperCase(),
        imageFile,
      }).unwrap();

      showToast({ title: "Added", text: "Category added", icon: "success" });

      setCategoryName("");
    } catch (err) {
      console.error("Add category error:", err);
      showToast({
        title: "Error",
        text: err?.data?.message || "Failed to add category",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;
    setLoadingId(id);
    try {
      await deleteCategory(id).unwrap();
      showToast({
        title: "Deleted",
        text: "Category deleted",
        icon: "success",
      });
    } catch {
      showToast({
        title: "Error",
        text: "Failed to delete category",
        icon: "error",
      });
    } finally {
      setLoadingId(null);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const onSaveEdit = async ({ id, name, imageFile }) => {
    try {
      await editCategory({
        id,
        name: name.toUpperCase(),
        imageFile,
      }).unwrap();
      showToast({
        title: "Updated",
        text: "Category updated",
        icon: "success",
      });
    } catch {
      showToast({
        title: "Error",
        text: "Failed to update category",
        icon: "error",
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <div className="w-full space-y-3 pt-18 lg:pt-0">
      <form onSubmit={handleSubmit}>
        <div className="bg-slate-50 text-black rounded-2xl p-4 sm:p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Create New Category</h2>
            <p>
              Add a new category with an optional image to organize your content
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 place-items-center">
            <div className="space-y-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 ">
              <label className="block text-sm font-semibold mb-3">
                Category Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name..."
                  className="w-full p-4 rounded-xl bg-bg-input border border-slate-600/50 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 backdrop-blur-sm"
                  required
                />
                {categoryName && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                )}
              </div>
            </div>
            {/* image uploader */}
            <ImageUploader
              inputId="add-category-image"
              image={newCategoryImage}
              setImage={setNewCategoryImage}
            />
            {/* <div className="flex items-center justify-center">
            </div> */}

            {/* submit button */}
            <button
              type="submit"
              disabled={!categoryName.trim() || isAdding}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                categoryName.trim() && !isAdding
                  ? "bg-bg-primary hover:bg-primary text-white shadow-lg hover:shadow-xl"
                  : "bg-slate-700 text-white cursor-not-allowed"
              }`}
            >
              {isAdding ? "Creating..." : "Create Category"}
            </button>
          </div>
        </div>
      </form>

      <div className="p-5 lg:mt-5">
        <h3 className="text-xl font-semibold mb-10 lg:mb-4">
          📂 Available Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="w-full p-4 rounded-xl shadow-xl bg-slate-50 border-gray-700 hover:border-gray-600"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {category.image?.[0]?.url ? (
                    <img
                      src={category.image[0].url}
                      alt={category.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm">
                      <FaImage />
                    </div>
                  )}
                  <span className="text-lg font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-500 hover:text-blue-400 p-1 rounded"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-500 hover:text-red-400 p-1 rounded"
                    title="Delete"
                    disabled={loadingId === category._id}
                  >
                    {loadingId === category._id ? (
                      <svg
                        className="animate-spin h-5 w-5 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                    ) : (
                      <FaTrash />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
        onSave={onSaveEdit}
      />
    </div>
  );
};
