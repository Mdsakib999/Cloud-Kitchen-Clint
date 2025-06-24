import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaTags, FaImage, FaTimes } from "react-icons/fa";
import { Upload, X, Image, Check, AlertCircle } from "lucide-react";
import showToast from "../../../utils/ShowToast";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../redux/apiSlice";

export const ManageCategory = () => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editId) {
      const cat = categories.find((c) => c._id === editId);
      if (cat) {
        setCategoryName(cat.name);
        if (cat.image && cat.image[0] && cat.image[0].url) {
          setPreview(cat.image[0].url);
        }
      }
    } else {
      setPreview(null);
      setImageFile(null);
    }
  }, [editId, categories]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    try {
      const formData = new FormData();
      formData.append("name", categoryName);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      if (editId) {
        await editCategory({
          id: editId,
          name: categoryName,
          imageFile,
        }).unwrap();
        showToast({
          title: "Updated",
          text: "Category updated successfully",
          icon: "success",
        });
      } else {
        await addCategory({ name: categoryName, imageFile }).unwrap();
        showToast({ title: "Added", text: "Category added", icon: "success" });
      }

      // Reset form
      setCategoryName("");
      setEditId(null);
      setImageFile(null);
      setPreview(null);
    } catch {
      showToast({
        title: "Error",
        text: "Failed to save category",
        icon: "error",
      });
    }
  };

  const handleEdit = (id) => setEditId(id);

  const handleDelete = async (id) => {
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
        setPreview(null);
      }
    } catch {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Simulate upload process
      setUploadStatus("uploading");
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
          setUploadStatus("success");
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setUploadStatus("");
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
      setSelectedImage(file);
      setUploadStatus("uploading");
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
          setUploadStatus("success");
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleCancel = () => {
    handleRemoveImage();
    handleCancelEdit();
  };

  return (
    <div className="w-full pt-40 max-w-7xl mx-auto">
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-bg-secondary rounded-2xl p-8 shadow-2xl border border-slate-700/50">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {editId ? "Edit Category" : "Create New Category"}
            </h2>
            <p className="text-slate-400">
              {editId
                ? "Update the category details below"
                : "Add a new category with an optional image to organize your content"}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Category Name Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Category Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name..."
                    className="w-full p-4 rounded-xl bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                    required
                  />
                  {categoryName && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Category Preview */}
              {categoryName && (
                <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-600/30">
                  <p className="text-sm text-slate-400 mb-2">Preview:</p>
                  <div className="flex items-center gap-3">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Category"
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
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

            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Category Image
                <span className="text-slate-500 font-normal ml-1">
                  (Optional)
                </span>
              </label>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={imagePreview}
                      alt="Category preview"
                      className="w-full h-48 object-cover bg-slate-800 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                  isDragOver
                    ? "border-blue-400 bg-blue-500/10"
                    : imagePreview
                    ? "border-slate-600/50 bg-slate-800/20"
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
                      <p className="text-slate-400">Uploading...</p>
                    </div>
                  ) : uploadStatus === "success" ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                        <Check className="w-6 h-6 text-green-400" />
                      </div>
                      <p className="text-green-400 font-medium mb-1">
                        Image uploaded successfully!
                      </p>
                      <p className="text-slate-400 text-sm">
                        Click to change image
                      </p>
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
                      <p className="text-slate-400 text-sm mb-3">
                        or click to browse
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <AlertCircle className="w-3 h-3" />
                        <span>JPG, PNG, GIF up to 5MB</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {imagePreview && (
                <div className="flex gap-3">
                  <label
                    htmlFor="category-image"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition-colors duration-200 font-medium"
                  >
                    <Image className="w-4 h-4" />
                    Change Image
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors duration-200 font-medium"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end gap-3">
            {editId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-200 bg-slate-700 text-slate-300 hover:bg-slate-600"
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
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
            >
              {editId ? "Update Category" : "Create Category"}
            </button>
          </div>
        </div>
      </form>

      {/* Category Display */}
      <div className="p-5 lg:mt-5">
        <h3 className="text-xl font-semibold mb-10 lg:mb-4 text-white">
          📂 Available Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className={`w-full p-4 rounded-xl shadow-md shadow-primary/50 bg-gray-800 border transition-all duration-200 ${
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
                      src={category.image}
                      alt={category.name}
                      className="w-10 h-10 object-cover rounded-full border border-primary"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm">
                      <FaImage />
                    </div>
                  )}
                  <span className="text-lg font-medium text-white">
                    {category.name}
                  </span>
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
