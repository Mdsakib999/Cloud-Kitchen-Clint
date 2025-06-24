import React, { useState, useRef } from "react";
import { Upload, X, ImageIcon, Plus, Check, AlertCircle } from "lucide-react";

const AddOffer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);

    if (images.length + files.length > 4) {
      setUploadStatus({
        type: "error",
        message: "Maximum 4 images allowed",
      });
      return;
    }

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              file: file,
              preview: e.target.result,
              name: file.name,
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Clear the input value to allow selecting the same file again if needed
    event.target.value = "";
  };

  // Handle keyboard events for upload
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && images.length > 0) {
      event.preventDefault();
      handleUpload();
    }
  };

  // Remove image
  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setUploadStatus(null);
  };

  // Upload images to backend
  const handleUpload = async () => {
    if (images.length === 0) {
      setUploadStatus({
        type: "error",
        message: "Please select at least one image",
      });
      return;
    }

    setLoading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      images.forEach((img) => {
        formData.append("images", img.file);
      });

      const response = await fetch("/api/promote-offers", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus({
          type: "success",
          message: "Images uploaded successfully!",
        });
        // Optionally clear images after successful upload
        // setImages([]);
      } else {
        setUploadStatus({
          type: "error",
          message: data.message || "Upload failed",
        });
      }
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get layout configuration based on number of images
  const getLayoutConfig = (count) => {
    switch (count) {
      case 1:
        return [{ span: "col-span-4 row-span-2", size: "large" }];
      case 2:
        return [
          { span: "col-span-2 row-span-2", size: "medium" },
          { span: "col-span-2 row-span-2", size: "medium" },
        ];
      case 3:
        return [
          { span: "col-span-2 row-span-2", size: "medium" },
          { span: "col-span-2 row-span-1", size: "small" },
          { span: "col-span-2 row-span-1", size: "small" },
        ];
      case 4:
        return [
          { span: "col-span-1 row-span-2", size: "small" },
          { span: "col-span-1 row-span-1", size: "small" },
          { span: "col-span-2 row-span-1", size: "medium" },
          { span: "col-span-3 row-span-1", size: "large" },
        ];
      default:
        return [];
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-black text-gray-800 mb-4 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Plus className="w-8 h-8 text-white" />
            </div>
            Add Promotional Offers
          </h1>
          <p className="text-gray-600 text-lg">
            Upload 1-4 images to create stunning promotional offers. See how
            they'll look below.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Upload className="w-6 h-6 text-purple-500" />
            Upload Images
          </h2>

          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-600 mb-2">
              Click to upload images
            </p>
            <p className="text-gray-500">
              PNG, JPG, JPEG up to 10MB each (Max 4 images) - Press Enter to
              upload after selecting
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Selected Images */}
          {images.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Selected Images ({images.length}/4)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="w-full h-32 object-cover rounded-xl shadow-lg"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs truncate max-w-24">
                      {image.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status Messages */}
          {uploadStatus && (
            <div
              className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                uploadStatus.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {uploadStatus.type === "success" ? (
                <Check className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="font-medium">{uploadStatus.message}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8">
            <button
              onClick={handleUpload}
              disabled={loading || images.length === 0}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Images {images.length > 0 && `(${images.length})`}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Preview with Actual Images */}
        {images.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Live Preview - How your {images.length} image
              {images.length > 1 ? "s" : ""} will appear
            </h2>

            {/* Preview Section */}
            <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 rounded-2xl p-8 relative overflow-hidden">
              {/* Background effects */}
              <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
              </div>

              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto lg:h-[500px]">
                  {images.map((image, index) => {
                    const layoutConfig = getLayoutConfig(images.length)[index];

                    return (
                      <div
                        key={image.id}
                        className={`relative overflow-hidden rounded-2xl ${layoutConfig.span} min-h-48 shadow-xl border border-white/10 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 cursor-pointer group`}
                      >
                        {/* Actual uploaded image as background */}
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${image.preview})` }}
                        />

                        {/* Optional overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Image number indicator */}
                        <div className="absolute top-3 left-3 bg-white/90 text-gray-800 px-3 py-1 rounded-full font-bold text-sm z-10">
                          #{index + 1}
                        </div>

                        {/* Image name */}
                        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-10 max-w-32 truncate">
                          {image.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-800 font-medium flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                This is exactly how your {images.length} image
                {images.length > 1 ? "s" : ""} will appear in the promotional
                section
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddOffer;
