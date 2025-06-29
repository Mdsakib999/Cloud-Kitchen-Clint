import { useState } from "react";
import showToast from "../../utils/ShowToast";
import { Upload, X, Check, AlertCircle } from "lucide-react";

export const ImageUploader = ({ image, setImage }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type)
    ) {
      setImage(file);
      setUploadStatus("success");
    } else {
      showToast(
        "Error",
        "Please upload a valid image (JPEG/PNG/WEBP/JPG)",
        "error"
      );
      setUploadStatus("idle");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleImageChange(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setUploadStatus("idle");
  };

  return (
    <div className="space-y-4 w-full mx-auto flex flex-col lg:flex-row items-start gap-6 my-10">
      {/* Upload Area */}
      <div
        className={`relative w-full lg:w-1/2 border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
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
          id="blog-cover-image"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
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
              <button
                type="button"
                onClick={() =>
                  document.getElementById("blog-cover-image").click()
                }
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Click to change image
              </button>
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
              <p className="text-sm mb-3">or</p>
              <button
                type="button"
                onClick={() =>
                  document.getElementById("blog-cover-image").click()
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Browse Files
              </button>
              <div className="flex items-center gap-2 text-xs mt-3 text-white/60">
                <AlertCircle className="w-3 h-3" />
                <span>JPG, PNG, WEBP up to 5MB</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      {image && (
        <div className="relative w-full lg:w-1/2 group">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full h-80 object-cover bg-slate-800 rounded-xl"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
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
    </div>
  );
};
