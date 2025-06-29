import React, { useState } from "react";
import {
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "../../../redux/apiSlice";
import { toast } from "react-hot-toast";

export const ManageBlog = () => {
  // Fetch all blogs
  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllBlogsQuery();

  // Mutations
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
  console.log(blogs);
  // Local state for inline editing
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const list = Array.isArray(blogs) ? blogs : [];

  const handleEditClick = (blog) => {
    setEditingId(blog._id);
    setEditTitle(blog.title);
  };

  const handleUpdateSubmit = async (id) => {
    try {
      await updateBlog({
        id,
        formData: new FormData(Object.entries({ title: editTitle })),
      }).unwrap();
      toast.success("Blog updated");
      setEditingId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id).unwrap();
      toast.success("Blog deleted");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  if (isLoading) return <p>Loading blogs…</p>;
  if (isError) return <p className="text-red-500">Error: {error?.message}</p>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>
      <div className="space-y-4">
        {list.map((blog) => (
          <div
            key={blog._id}
            className="p-4 border rounded-lg flex items-center justify-between"
          >
            {/* Title / Inline‐Edit */}
            <div className="flex-1">
              {editingId === blog._id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <h2 className="text-xl font-semibold">{blog.title}</h2>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {editingId === blog._id ? (
                <>
                  <button
                    onClick={() => handleUpdateSubmit(blog._id)}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition"
                  >
                    {isUpdating ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(blog)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    {isDeleting ? "Deleting…" : "Delete"}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
