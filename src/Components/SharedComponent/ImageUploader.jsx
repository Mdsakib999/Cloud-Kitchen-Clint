import { useState, useEffect, useMemo, useId } from "react";
import { Upload, X, Check, AlertCircle } from "lucide-react";
import showToast from "../../utils/ShowToast";

export const ImageUploader = ({
  image: externalImage,
  setImage: externalSetImage,
  inputId,
}) => {
  const uniqueId = useId();
  const inputFieldId = inputId || `image-input-${uniqueId}`;

  const [internalImage, setInternalImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [isDragOver, setIsDragOver] = useState(false);

  const image = externalImage ?? internalImage;
  const setImage = externalSetImage ?? setInternalImage;

  const previewUrl = useMemo(() => {
    if (!image) return null;
    if (typeof image === "string") return image;
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (image && typeof image !== "string") {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image, previewUrl]);

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
    const file = e.dataTransfer.files[0];
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

  const handleRemoveImage = () => {
    setImage(null);
    setUploadStatus("idle");
  };

  return (
    <div className="space-y-4 w-full mx-auto flex flex-col lg:flex-row items-start gap-6 my-10">
      <div
        className={`relative w-full lg:w-1/2 border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
          isDragOver
            ? "border-blue-400 bg-blue-500/10"
            : "border-slate-600/50 bg-bg-secondary hover:border-slate-500/50 hover:bg-bg-input"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={inputFieldId}
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
                onClick={() => document.getElementById(inputFieldId).click()}
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
              <p className="text-sm mb-3 text-white">or</p>
              <button
                type="button"
                onClick={() => document.getElementById(inputFieldId).click()}
                className="bg-primary hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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

      {previewUrl && (
        <div className="relative w-full lg:w-1/2 group">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-80 object-cover bg-bg-secondary rounded-xl"
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
