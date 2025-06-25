import { useState, useRef, useEffect } from "react";
import {
  Upload,
  X,
  ImageIcon,
  Plus,
  Check,
  AlertCircle,
  Trash2,
} from "lucide-react";
import axiosInstance from "../../../Utils/axios";
import Swal from "sweetalert2";

const AddOffer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fetching, setFetching] = useState(true);
  const fileInputRef = useRef(null);

  // Fetch existing offers on mount
  useEffect(() => {
    const fetchOffers = async () => {
      setFetching(true);
      try {
        const res = await axiosInstance.get("/admin/all-offers");
        const offer = res.data?.data?.[0];
        if (offer && offer.images) {
          setImages(
            offer.images.map((img, idx) => ({
              id: img.public_id || img.url || idx,
              url: img.url,
              name: img.public_id?.split("/").pop() || `offer${idx + 1}.jpg`,
              preview: img.url,
              isExisting: true,
            }))
          );
        }
      } catch (e) {
        // ignore
      } finally {
        setFetching(false);
      }
    };
    fetchOffers();
  }, []);

  // Handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (images.length + files.length > 4) {
      setUploadStatus({ type: "error", message: "Maximum 4 images allowed" });
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
              file,
              preview: e.target.result,
              name: file.name,
              isExisting: false,
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
    event.target.value = "";
  };

  // Handle keyboard events for upload
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && images.length > 0) {
      event.preventDefault();
      handleUpload();
    }
  };

  // Remove image (existing or new)
  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setUploadStatus(null);
  };

  // Upload images to backend (replace all)
  const handleUpload = async () => {
    if (images.length === 0) {
      setUploadStatus({
        type: "error",
        message: "Please select at least one image",
      });
      return;
    }
    // Warn if both new and existing images are present (backend does not support keeping)
    const hasNew = images.some((img) => img.file);
    const hasExisting = images.some((img) => img.url && !img.file);
    if (hasNew && hasExisting) {
      setUploadStatus({
        type: "error",
        message:
          "Cannot mix new and existing images. Please remove old images or upload only new ones. (Or update backend to support keeping existing images.)",
      });
      return;
    }
    setLoading(true);
    setUploadStatus(null);
    try {
      const formData = new FormData();
      images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });
      const response = await axiosInstance.post("/admin/add-offers", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data?.success) {
        setUploadStatus({
          type: "success",
          message: "Offers updated successfully!",
        });
        setImages(
          response.data.data.images.map((img, idx) => ({
            id: img.public_id || img.url || idx,
            url: img.url,
            name: img.public_id?.split("/").pop() || `offer${idx + 1}.jpg`,
            preview: img.url,
            isExisting: true,
          }))
        );
      } else {
        setUploadStatus({
          type: "error",
          message: response.data?.message || "Upload failed",
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

  // Delete all offers
  const handleDeleteAll = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete all promotional offers.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "bg-gray-800 text-white rounded-2xl",
        title: "text-white font-bold",
        content: "text-gray-300",
        confirmButton:
          "bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition",
        cancelButton:
          "bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition",
      },
      buttonsStyling: false,
    });
    if (confirm.isConfirmed) {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/admin/all-offers");
        const offer = res.data?.data?.[0];
        if (offer) {
          await axiosInstance.delete(`/admin/delete-offer/${offer._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        }
        setImages([]);
        setUploadStatus({ type: "success", message: "All offers deleted." });
      } catch (e) {
        setUploadStatus({ type: "error", message: "Failed to delete offers." });
      } finally {
        setLoading(false);
      }
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
              PNG, JPG, JPEG up to 5MB each (Max 4 images) - Press Enter to
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

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
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
            <button
              onClick={handleDeleteAll}
              disabled={loading || fetching || images.length === 0}
              className="w-full bg-red-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5" />
                  Delete All Offers
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
