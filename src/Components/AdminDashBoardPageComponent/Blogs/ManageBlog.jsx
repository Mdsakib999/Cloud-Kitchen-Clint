import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import { toast } from "react-hot-toast";
import UpdateBlogModal from "./UpdateBlogModal";
import { BlogCardSkeleton } from "../../SharedComponent/BlogCardSkeleton";
import {
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "../../../redux/apiSlice";

export const ManageBlog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const {
    data: userBlogs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllBlogsQuery();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteBlog(id).unwrap();
        toast.success("Blog deleted successfully!");
        refetch();
      } catch (err) {
        toast.error("Failed to delete blog. Please try again.");
        console.error("Error deleting blog:", err);
      }
    }
  };

  if (isLoading) {
    return <BlogCardSkeleton />;
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center py-40">
        <span className="text-xl font-medium text-red-500">
          Error: {error?.message || "Failed to load blogs"}
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20 md:mt-16">
      <h1 className="text-3xl md:text-4xl text-center font-bold text-white bg-bg-primary py-4 px-6 rounded-lg shadow-md">
        Published Blogs
      </h1>

      {userBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          {userBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
            >
              {/* Blog Image */}
              <figure className="relative h-44 w-full overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </figure>

              {/* Blog Content */}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {blog.title}
                </h2>

                <div className="text-gray-600 text-sm mb-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        blog.content.length > 200
                          ? blog.content.slice(0, 200) + "..."
                          : blog.content
                      ),
                    }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex mt-4 space-x-3">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md transition"
                  >
                    <FaEdit className="text-lg" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={isDeleting}
                    className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrashAlt className="text-lg" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No blogs published yet.
        </p>
      )}

      {/* Modal */}
      {selectedBlog && (
        <UpdateBlogModal
          data={selectedBlog}
          onClose={() => setSelectedBlog(null)}
          onSave={async (formData) => {
            try {
              await updateBlog({ id: selectedBlog._id, formData }).unwrap();
              toast.success("Blog updated successfully!");
              setSelectedBlog(null);
              refetch();
            } catch (err) {
              console.error(err);
              toast.error("Failed to update blog");
            }
          }}
          isSaving={isUpdating}
        />
      )}
    </div>
  );
};
