import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { Upload, X, Check, AlertCircle } from "lucide-react";
import showToast from "../../../utils/ShowToast";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../redux/apiSlice";
import Swal from "sweetalert2";

export const AddCategory = () => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (editId) {
      const cat = categories.find((c) => c._id === editId);
      if (cat) {
        setCategoryName(cat.name);
        if (cat.image && cat.image[0] && cat.image[0].url) {
          setImagePreview(cat.image[0].url);
          // Don't set imageFile for existing images
          setImageFile(null);
        }
      }
    } else {
      // Reset all states when not editing
      setImagePreview(null);
      setImageFile(null);
      setUploadStatus("");
    }
  }, [editId, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      if (editId) {
        await editCategory({
          id: editId,
          name: categoryName,
          imageFile, // This will be null if no new image selected
        }).unwrap();
        showToast({
          title: "Updated",
          text: "Category updated successfully",
          icon: "success",
        });
      } else {
        await addCategory({
          name: categoryName,
          imageFile, // This will be the selected file or null
        }).unwrap();
        showToast({
          title: "Added",
          text: "Category added",
          icon: "success",
        });
      }

      // Reset form
      setCategoryName("");
      setEditId(null);
      setImageFile(null);
      setImagePreview(null);
      setUploadStatus("");

      console.log("Category Name:", categoryName);
      console.log("Image File:", imageFile);
    } catch (error) {
      console.error("Error saving category:", error);
      showToast({
        title: "Error",
        text: "Failed to save category",
        icon: "error",
      });
    }
  };

  const handleEdit = (id) => setEditId(id);

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

    try {
      await deleteCategory(id).unwrap();
      showToast({
        title: "Deleted",
        text: "Category deleted successfully",
        icon: "success",
      });

      if (editId === id) {
        setEditId(null);
        setCategoryName("");
        setImagePreview(null);
        setImageFile(null);
      }
    } catch (error) {
      showToast({
        title: "Error",
        text: "Failed to delete category",
        icon: "error",
      });
    }
  };

  const handleCancelEdit = () => {
    setCategoryName("");
    setEditId(null);
    handleRemoveImage();
  };

  const processImageFile = (file) => {
    setImageFile(file);
    setUploadStatus("uploading");

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setUploadStatus("success");
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setUploadStatus("");
    // Clear the file input
    const fileInput = document.getElementById("category-image");
    if (fileInput) {
      fileInput.value = "";
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
    if (file && file.type.startsWith("image/")) {
      processImageFile(file);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <div className="w-full space-y-6 pt-18 lg:pt-0">
      <form onSubmit={handleSubmit}>
        <div className="bg-slate-50 text-black rounded-2xl p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {editId ? "Edit Category" : "Create New Category"}
            </h2>
            <p>
              {editId
                ? "Update the category details below"
                : "Add a new category with an optional image to organize your content"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 place-items-center">
            {/* Category Name */}
            <div className="space-y-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
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

            {/* Image Upload */}
            <div className="space-y-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
              <label className="block text-sm font-semibold mb-3">
                Category Image <span className="font-normal">(Optional)</span>
              </label>
              {imagePreview && (
                <div className="relative group w-full">
                  <img
                    src={imagePreview}
                    alt="Category preview"
                    className="w-full h-48 object-contain bg-slate-800 rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              <div
                className={`w-full border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
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
                  id="category-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  {uploadStatus === "uploading" ? (
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                      <p>Uploading...</p>
                    </div>
                  ) : uploadStatus === "success" ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                        <Check className="w-6 h-6 text-green-400" />
                      </div>
                      <p className="text-green-400 font-medium mb-1">
                        Image uploaded successfully!
                      </p>
                      <p className="text-sm">Click to change image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6 text-blue-400" />
                      </div>
                      <p className="text-white font-medium mb-1">
                        {isDragOver
                          ? "Drop your image here"
                          : "Drag & drop an image here"}
                      </p>
                      <p className="text-sm mb-3">or click to browse</p>
                      <div className="flex items-center gap-2 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>JPG, PNG, GIF up to 5MB</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
            {editId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-8 py-3 rounded-xl font-semibold bg-slate-700 text-white hover:bg-slate-600"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={!categoryName.trim()}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                categoryName.trim()
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-slate-700 text-white cursor-not-allowed"
              }`}
            >
              {editId ? "Update Category" : "Create Category"}
            </button>
          </div>
        </div>
      </form>

      {/* Categories List */}
      <div className="p-5 lg:mt-5">
        <h3 className="text-xl font-semibold mb-10 lg:mb-4">
          📂 Available Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className={`w-full p-4 rounded-xl shadow-xl bg-slate-50 ${
                editId === category._id
                  ? "border-blue-500 bg-blue-900/20"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              {/* Category Info and Actions */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {category.image ? (
                    <img
                      src={category.image?.[0]?.url || "fallback.jpg"}
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
                    onClick={() => handleEdit(category._id)}
                    className="text-blue-500 hover:text-blue-400 transition p-1 rounded"
                    title="Edit category"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-500 hover:text-red-400 transition p-1 rounded"
                    title="Delete category"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
