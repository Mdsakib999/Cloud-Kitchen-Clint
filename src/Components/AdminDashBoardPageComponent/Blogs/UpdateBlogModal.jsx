import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageUploader } from "../../SharedComponent/ImageUploader";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UpdateBlogModal({ onClose, data, onSave, isSaving }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: data?.title || "",
    content: data?.content || "",
  });

  const [removeImage, setRemoveImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleRemoveImage = () => {
    setRemoveImage(!removeImage);
    setSelectedImage(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("content", formData.content);

    if (removeImage) {
      updatedData.append("removeImage", "true");
    } else if (selectedImage) {
      updatedData.append("image", selectedImage);
    }

    try {
      // await updateBlog(data._id, updatedData);
      // await fetchBlogs();
      // showToast("Success", "Blog updated successfully!", "success");
      await onSave(updatedData);
      toast.success("Blog updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating blog:", error);
      showToast("Error", "Failed to update blog", "error");
      toast.error("Failed to update blog");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-full h-full max-w-5xl bg-white rounded-xl shadow-xl overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
          onClick={onClose}
        >
          ✕
        </button>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Current Image (if any and not removed) */}
          {data.image && !removeImage && !selectedImage && (
            <div className="mb-4">
              <p className="text-gray-700 font-semibold mb-2">Current Image</p>
              <img
                src={data.image}
                alt="Current"
                className="w-full max-h-60 object-contain rounded-lg"
              />
            </div>
          )}

          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Content</label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
              className="h-[300px]"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "list",
                "bullet",
                "link",
              ]}
            />
          </div>

          {/* Image Uploader */}
          <div className="space-y-2 mt-6">
            <label className="block text-gray-700 font-semibold">
              Upload Image
            </label>
            <ImageUploader image={selectedImage} setImage={setSelectedImage} />
          </div>

          {/* Remove image checkbox */}
          <label className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              checked={removeImage}
              onChange={handleRemoveImage}
            />
            <span className="text-gray-700 font-medium">
              Remove current image
            </span>
          </label>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-2 rounded-md text-white font-semibold ${
                isSaving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSaving ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBlogModal;
