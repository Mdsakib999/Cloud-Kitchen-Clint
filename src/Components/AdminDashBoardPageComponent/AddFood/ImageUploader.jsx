import { useState, useCallback } from "react";
import { X, Upload } from "lucide-react";

export default function ImageUploader({
  uploadedImages,
  setUploadedImages,
  setValue,
}) {
  const [dragOver, setDragOver] = useState(false);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      handleFiles(files);
    },
    [uploadedImages, setValue]
  );

  const handleFiles = (files) => {
    const newUploads = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    const updated = [...uploadedImages, ...newUploads];
    setUploadedImages(updated);
    setValue(
      "images",
      updated.map((u) => u.file)
    );
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const removeImage = (index) => {
    const filtered = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(filtered);
    setValue(
      "images",
      filtered.map((u) => u.file)
    );
  };

  return (
    <div className="mb-8">
      <label className="block text-sm font-semibold text-gray-700 mb-4">
        Food Images
      </label>

      {/* Dropzone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-600 mb-2">
            Drag & drop images here
          </p>
          <p className="text-gray-500 mb-4">or</p>
          <label className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
            Choose Files
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Preview Grid */}
      {uploadedImages.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {uploadedImages.map((image, idx) => (
            <div key={idx} className="relative group">
              <img
                src={image.preview}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
