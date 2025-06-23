import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTags } from "react-icons/fa";
import showToast from "../../../utils/ShowToast";
import { PrimaryButton } from "../../SharedComponent/PrimaryButton";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../redux/apiSlice";

export const AddCategory = () => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  console.log(categories);
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    try {
      if (editId) {
        await editCategory({
          id: editId,
          name: categoryName,
          imageFile,
        }).unwrap();
        showToast({
          title: "Updated",
          text: "Category updated",
          icon: "success",
        });
      } else {
        await addCategory({ name: categoryName, imageFile }).unwrap();
        showToast({ title: "Added", text: "Category added", icon: "success" });
      }
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
        text: "Category deleted",
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <div className="w-full space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 shadow-md rounded-lg p-6 bg-gray-100 text-black"
      >
        <h2 className="text-3xl font-bold tracking-tight">
          {editId ? "✏️ Edit Category" : "➕ Add New Category"}
        </h2>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-400"
          required
        />
        <div className="w-full">
          <label className="block text-sm font-medium mb-1 text-white">
            Category Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-800"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 h-32 rounded-lg object-cover"
            />
          )}
        </div>
        <PrimaryButton type="submit">
          {editId ? "Update Category" : "Add Category"}
        </PrimaryButton>
      </form>

      <div className="p-5 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          📂 Available Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex items-center justify-between p-4 bg-gray-200 text-black rounded-lg shadow"
            >
              <div className="flex items-center gap-3">
                {category.image && category.image[0] && (
                  <img
                    src={category.image[0].url}
                    alt={category.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <h4 className="text-lg font-medium ">{category.name}</h4>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleEdit(category._id)}
                  className="text-blue-500 hover:text-blue-600"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
