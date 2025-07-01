import { useState, useRef, useEffect } from "react";
import {
  Upload,
  X,
  ImageIcon,
  Plus,
  Check,
  CircleAlert,
  Trash2,
} from "lucide-react";
import axiosInstance from "../../../Utils/axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AddOffer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [insertIndex, setInsertIndex] = useState(null);
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
      toast.error("Maximum 4 images allowed", {
        className: "font-serif text-center",
      });
      event.target.value = "";
      return;
    }
    files.forEach((file, idx) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages((prev) => {
            let insertAt = insertIndex !== null ? insertIndex : prev.length;
            let newArr = [...prev];
            newArr.splice(insertAt, 0, {
              id: Date.now() + Math.random(),
              file,
              preview: e.target.result,
              name: file.name,
              isExisting: false,
            });
            return newArr;
          });
          setInsertIndex(null);
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
    setImages((prev) => {
      const idx = prev.findIndex((img) => img.id === id);
      setInsertIndex(idx);
      return prev.filter((img) => img.id !== id);
    });
  };

  // Upload images to backend (replace all)
  const handleUpload = async () => {
    if (images.length === 0) {
      toast.error("Please select at least one image", {
        className: "font-serif text-center",
      });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      // Collect all existing image URLs
      const existingUrls = images
        .filter((img) => img.url && !img.file)
        .map((img) => img.url);
      formData.append("existingUrls", JSON.stringify(existingUrls));
      // Append new files (with name for order tracking)
      images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file, img.name);
        }
      });
      // Send order array for backend to reconstruct order
      const imageOrder = images.map((img) =>
        img.file
          ? { type: "new", name: img.name }
          : { type: "existing", url: img.url }
      );
      formData.append("imageOrder", JSON.stringify(imageOrder));
      const response = await axiosInstance.post("/admin/add-offers", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data?.success) {
        toast.success("Offers updated successfully!", {
          className: "font-serif text-center",
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
        toast.error(response.data?.message || "Upload failed", {
          className: "font-serif text-center",
        });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        className: "font-serif text-center",
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
        toast.success("All offers deleted.", {
          className: "font-serif text-center",
        });
      } catch (e) {
        toast.error("Failed to delete offers.", {
          className: "font-serif text-center",
        });
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
      className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6 mt-20 md:mt-10 lg:mt-0 font-serif"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col justify-center items-center p-8 mb-8">
          <h1 className="text-center text-xl md:text-3xl lg:text-4xl font-black text-gray-800 mb-4 flex items-center gap-x-2">
            <div className="hidden md:block p-2 bg-gradient-to-tl from-emerald-500 to-green-200 rounded-xl">
              <Plus className="w-8 h-8 text-white" />
            </div>
            Add Promotional Offers
          </h1>
          <p className="text-gray-600 text-sm">
            Upload 1-4 images to create stunning promotional offers. See how
            they'll look below.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Upload className="w-6 h-6 text-purple-500" />
            Upload Images
          </h2>

          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-5 md:p-8 lg:p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-600 mb-2">
              Click to upload images
            </p>
            <p className="text-gray-500">
              PNG, JPG, JPEG up to 5MB each (Max 4 images)
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
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="w-full h-32 object-cover rounded-xl shadow-lg"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="cursor-pointer absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 duration-200 hover:bg-red-600"
                      disabled={loading}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <button
              onClick={handleUpload}
              disabled={loading || images.length === 0}
              className="cursor-pointer w-full bg-yellow-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-yellow-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Uploading...</>
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
              className="cursor-pointer w-full bg-red-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-red-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete All Offers
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
                        className={`relative overflow-hidden rounded-2xl ${layoutConfig.span} min-h-48 shadow-xl border border-white/10 backdrop-blur-sm transform transition-all duration-300 cursor-pointer group`}
                      >
                        {/* Actual uploaded image as background */}
                        <div
                          className="absolute inset-1 bg-cover bg-center"
                          style={{ backgroundImage: `url(${image.preview})` }}
                        />

                        {/* Optional overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-800 font-medium flex items-center gap-2">
                <CircleAlert className="w-5 h-5" />
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
