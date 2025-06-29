import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateBlogModal from "./UpdateBlogModal";
import DOMPurify from "dompurify";
import showToast from "../../../utils/ShowToast";
import { BlogCardSkeleton } from "../../SharedComponent/BlogCardSkeleton";

export const ManageBlog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const loading = true;
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
        // await deleteBlog(id); // Uncomment when real function exists
        showToast("Success", "Blog deleted successfully!", "success");
      } catch (err) {
        showToast("Error", "Failed to delete blog. Please try again.", "error");
        console.error("Error deleting blog:", err);
      }
    }
  };

  if (loading) {
    return <BlogCardSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl text-center font-bold text-white bg-blue-600 py-4 px-6 rounded-lg shadow-md">
        Published Blogs
      </h1>

      {userBlogs?.length > 0 ? (
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
                  <span
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
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                  >
                    <FaEdit className="text-lg" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
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
        />
      )}
    </div>
  );
};
