import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaTags } from "react-icons/fa";
import showToast from "../../../utils/ShowToast";
import { PrimaryButton } from "../../SharedComponent/PrimaryButton";
export const AddCategory = () => {
  const categories = [
    { name: "Burger" },
    { name: "Pizza" },
    { name: "Fancy Fry" },
    { name: "Club Sandwich" },
    { name: "Chicken Wings" },
    { name: "Chow Mein" },
    { name: "Cold Coffee" },
  ];
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      if (editId) {
        await updateCategory(editId, categoryName);
        showToast({
          title: "Updated",
          text: "Category updated",
          icon: "success",
        });
      } else {
        // await addCategory(categoryName);
        showToast({ title: "Added", text: "Category added", icon: "success" });
      }
      setCategoryName("");
      setEditId(null);
    } catch (err) {
      showToast({
        title: "Error",
        text: "Failed to save category",
        icon: "error",
      });
    }
  };

  const handleEdit = (id) => {
    const category = categories.find((c) => c._id === id);
    if (category) {
      setCategoryName(category.name);
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      showToast({
        title: "Deleted",
        text: "Category deleted",
        icon: "success",
      });
    } catch (err) {
      showToast({
        title: "Error",
        text: "Failed to delete category",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4  shadow-md rounded overflow-hidden p-5 bg-bg-secondary text-white"
      >
        {/* Form Header */}
        <h2 className="text-3xl font-bold text-center mb-8 tracking-tight">
          {editId ? "✏️ Edit Category" : "➕ Add New Category"}
        </h2>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <PrimaryButton type="submit">
          {editId ? "Update Category" : "Add Category"}
        </PrimaryButton>
      </form>

      {/* Category Display */}
      <div className=" p-5 lg:mt-5 bg-bg-secondary text-white rounded">
        <h3 className="text-xl font-semibold  mb-10 lg:mb-4">
          📂Available Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {categories.map((category) => (
            <div
              key={category._id}
              className="w-full p-2 rounded-xl shadow-md flex justify-between items-center gap-2 shadow-primary/50"
            >
              <div className="flex items-center gap-2">
                <FaTags className="text-blue-500" />
                <span className="text-lg font-medium">{category.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleEdit(category._id)}
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="text-red-500 hover:text-red-700 transition"
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
