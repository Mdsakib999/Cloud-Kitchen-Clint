import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageUploader } from "../../SharedComponent/ImageUploader";

export const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title || !content) {
      showToast("Error", "Title and content are required", "error");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      setTitle("");
      setContent("");
      setImage(null);
      showToast("Success", "Blog created successfully!", "success");
      navigate("/");
    } catch (error) {
      setError(error.message || "Failed to create blog");
      showToast("Error", error.message || "Failed to create blog", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 container mx-auto bg-base-300 p-6 rounded-lg">
      <h1 className="text-3xl font-bold text-center text-primary">
        Create a Rich Blog
      </h1>

      {/* Title Input */}
      <div className="space-y-2">
        <label className="text-lg font-semibold">Blog Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your blog title..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>
      {/* Category Input */}
      <div className="space-y-2 mt-6">
        <label className="text-lg font-semibold">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Burger, Pizza, Fry"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>
      {/* Tags Input */}
      <div className="space-y-2 mt-6">
        <label className="text-lg font-semibold">Tags (comma separated)</label>
        <input
          type="text"
          value={tags.join(", ")}
          onChange={(e) =>
            setTags(
              e.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0)
            )
          }
          placeholder="e.g. Pizza, Italian, Recipe, Cooking"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      {/* Image Uploader */}
      <ImageUploader image={image} setImage={setImage} />

      {/* Content Editor */}
      <div className="space-y-2">
        <label className="text-lg font-semibold">Content</label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none h-[500px]"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: ["serif", "monospace", "sans-serif"] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              [{ align: [] }, "blockquote", "code-block"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "font",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "list",
            "bullet",
            "indent",
            "align",
            "blockquote",
            "code-block",
          ]}
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Publish Button */}
      <div className="flex justify-end mt-20">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`py-3 px-6 rounded-md text-lg font-semibold shadow-md transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-secondary"
          }`}
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </div>
    </div>
  );
};
