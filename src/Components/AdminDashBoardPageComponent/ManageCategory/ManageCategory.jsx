import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { Upload, X, Image, Check, AlertCircle } from "lucide-react";
import showToast from "../../../utils/ShowToast";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../redux/apiSlice";
import { EditCategoryModal } from "./EditCategoryModal";

export const ManageCategory = () => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    try {
      await addCategory({
        name: categoryName,
        imageFile: selectedImage,
      }).unwrap();

      showToast({
        title: "Added",
        text: "Category added successfully",
        icon: "success",
      });

      // Reset form
      setCategoryName("");
      setSelectedImage(null);
      setImagePreview(null);
      setUploadStatus("");
    } catch {
      showToast({
        title: "Error",
        text: "Failed to add category",
        icon: "error",
      });
    }
  };

  const handleEdit = (id) => {
    const cat = categories.find((c) => c._id === id);
    setSelectedCategory(cat);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      showToast({
        title: "Deleted",
        text: "Category deleted successfully",
        icon: "success",
      });
    } catch {
      showToast({
        title: "Error",
        text: "Failed to delete category",
        icon: "error",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setUploadStatus("uploading");
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setUploadStatus("success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type?.startsWith("image/")) {
      setSelectedImage(file);
      setUploadStatus("uploading");
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setUploadStatus("success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setUploadStatus("");
  };

  const handleModalSave = async ({ id, name, imageFile }) => {
    try {
      await editCategory({ id, name, imageFile }).unwrap();
      showToast({
        title: "Updated",
        text: "Category updated successfully",
        icon: "success",
      });
      setEditModalOpen(false);
      setSelectedCategory(null);
    } catch {
      showToast({
        title: "Error",
        text: "Failed to update category",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full pt-40 max-w-7xl mx-auto">
      {/* Create Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-bg-secondary rounded-2xl p-8 shadow-2xl border border-slate-700/50">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Create New Category
            </h2>
            <p className="text-slate-400">
              Add a new category with an optional image to organize your content
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Name input */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Category Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name..."
                  className="w-full p-4 rounded-xl bg-slate-800/50 border border-slate-600/50 text-white"
                  required
                />
                {categoryName && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                )}
              </div>

              {/* Preview */}
              {categoryName && (
                <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-600/30">
                  <p className="text-sm text-slate-400 mb-2">Preview:</p>
                  <div className="flex items-center gap-3">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-slate-700 flex items-center justify-center rounded-lg">
                        <Image className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                    <span className="text-white font-medium">
                      {categoryName}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-300">
                Category Image (Optional)
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
                  isDragOver
                    ? "border-blue-400 bg-blue-500/10"
                    : "border-slate-600/50 bg-slate-800/20 hover:border-slate-500/50 hover:bg-slate-800/30"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  {uploadStatus === "uploading" ? (
                    <p className="text-slate-400">Uploading...</p>
                  ) : uploadStatus === "success" ? (
                    <p className="text-green-400 font-medium">
                      Image uploaded successfully!
                    </p>
                  ) : (
                    <>
                      <Upload className="mx-auto text-blue-400 mb-2" />
                      <p className="text-white font-medium">
                        Drag & drop or click
                      </p>
                    </>
                  )}
                </div>
              </div>
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={!categoryName.trim()}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                categoryName.trim()
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
            >
              Create Category
            </button>
          </div>
        </div>
      </form>

      {/* Category List */}
      <div className="p-5 lg:mt-5">
        <h3 className="text-xl font-semibold mb-6 text-white">
          📂 Available Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="w-full p-4 rounded-xl shadow-md bg-gray-800 border border-gray-700"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-10 h-10 object-cover rounded-full border border-primary"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                      <FaImage />
                    </div>
                  )}
                  <span className="text-white font-medium">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(category._id)}
                    className="text-blue-500 hover:text-blue-400"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-500 hover:text-red-400"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <EditCategoryModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        category={selectedCategory}
        onSave={handleModalSave}
      />
    </div>
  );
};
