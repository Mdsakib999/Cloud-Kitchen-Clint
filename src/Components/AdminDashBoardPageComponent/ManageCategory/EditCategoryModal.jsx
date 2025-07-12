import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ImageUploader } from "../../SharedComponent/ImageUploader";

export const EditCategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setRemoveImage(false);
      setImage(null);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave({
        id: category._id,
        name,
        imageFile: image,
        removeImage: removeImage || (!image && !category?.image?.[0]?.url),
      });

      onClose();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return !isOpen ? null : (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-2xl flex justify-center items-center z-50">
      <div className="w-full h-full max-w-5xl bg-black/60 text-white rounded-xl shadow-xl shadow-bg-primary overflow-y-auto p-6 relative max-h-[90vh] scrollbar-hide">
        <button
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
          onClick={onClose}
          disabled={loading}
        >
          <X className="w-4 h-4" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Edit Category</h2>

          <div className="space-y-8">
            {/* Category Name */}
            <div className="flex flex-col items-center justify-center w-full space-y-2">
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <label className="text-sm font-medium">
                  Category Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name..."
                  required
                  disabled={loading}
                  className="px-4 py-3 rounded-xl bg-bg-input border border-slate-600/50 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
              </div>
            </div>

            {/* Category Image */}
            <div className="flex flex-col items-center justify-center w-full space-y-2">
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <label className="text-sm font-medium">
                  Category Image{" "}
                  <span className="text-slate-400">(optional)</span>
                </label>
              </div>
              <ImageUploader
                key={category?._id || "edit-default"}
                inputId={`edit-category-image-${category?._id || "default"}`}
                image={
                  image ||
                  (category?.image?.[0]?.url && !removeImage
                    ? category.image[0].url
                    : null)
                }
                setImage={(file) => {
                  setImage(file);
                  setRemoveImage(false);
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 flex items-center justify-center">
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className={`w-full md:w-1/2 py-3 rounded-xl font-semibold transition duration-200 ${
                loading
                  ? "bg-slate-600 text-white cursor-not-allowed"
                  : "bg-bg-secondary hover:bg-primary text-white"
              }`}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
