import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import showToast from "../../utils/ShowToast";

// 🔧 Mock Auth hook with in-memory storage
const useAuth = () => {
  const [user, setUserState] = useState({
    _id: "dummy123",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "0123456789",
    profilePicture:
      "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
  });

  const setUser = (newUser) => setUserState(newUser);
  return { user, setUser };
};

export const UpdateProfile = () => {
  const { user, setUser } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const currentPassword = watch("currentPassword", "");
  const newPassword = watch("newPassword", "");
  const name = watch("name", "");

  // Set initial form values from user data
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("mobile", user.mobile);
      setImagePreview(user.profilePicture);
    }
  }, [user, setValue]);

  const handleOutsideClick = (e) => {
    if (e.target.id === "modalOverlay") {
      setShowModal(false);
    }
  };

  const onSubmit = async (formData) => {
    const hasNameChanged = formData.name !== user.name;
    const hasNewPassword =
      formData.newPassword && formData.newPassword.length > 0;
    const hasProfilePictureChanged = selectedImage !== null;

    if (!hasNameChanged && !hasNewPassword && !hasProfilePictureChanged) {
      showToast({
        title: "No changes detected.",
        icon: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedForm = new FormData();
      updatedForm.append("currentPassword", formData.currentPassword);

      if (hasNameChanged) {
        updatedForm.append("name", formData.name);
      }
      if (hasNewPassword) {
        updatedForm.append("newPassword", formData.newPassword);
      }
      if (hasProfilePictureChanged) {
        updatedForm.append("profilePicture", selectedImage);
      }

      // Mock API call - replace with actual updateUser function
      // await updateUser(user._id, updatedForm);

      // Simulate API success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showToast({
        title: "Profile updated successfully!",
        icon: "success",
      });

      // Update user state
      const updatedUser = {
        ...user,
        name: formData.name,
        profilePicture: selectedImage
          ? URL.createObjectURL(selectedImage)
          : user.profilePicture,
      };
      setUser(updatedUser);

      // Reset form fields
      setValue("currentPassword", "");
      setValue("newPassword", "");
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
      showToast({
        title: "Failed to update profile.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = async () => {
    try {
      // Mock API call - replace with actual removeImage function
      // await removeUserImage(user._id);

      setSelectedImage(null);
      setImagePreview(
        "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
      );
      setUser({
        ...user,
        profilePicture:
          "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
      });

      showToast({
        title: "Profile picture removed successfully!",
        icon: "success",
      });
      setShowMenu(false);
    } catch (error) {
      showToast({
        title: "Error removing image.",
        icon: "error",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setShowMenu(false);
    }
  };

  const handleViewImage = () => {
    setShowModal(true);
    setShowMenu(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu && !e.target.closest(".profile-menu-container")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  return (
    <div className="flex justify-center items-center min-h-screen w-full mt-24 md:mt-10">
      <div className="rounded-xl shadow-lg w-full max-w-2xl p-6 bg-[#0E716C]">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Update Profile
        </h2>

        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center relative profile-menu-container">
            <div
              className="relative"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <img
                src={imagePreview || user.profilePicture}
                alt="Profile"
                className="rounded-full w-32 h-32 object-cover border-4 border-primary"
              />
              {hover && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <span className="text-white text-xl">✏️</span>
                </div>
              )}
            </div>
            {showMenu && (
              <div className="absolute top-36 z-10 bg-white rounded-lg shadow-md w-48 border">
                <ul className="divide-y divide-gray-200">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleViewImage}
                  >
                    View Image
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Change Image
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleRemoveImage}
                  >
                    Remove Image
                  </li>
                </ul>
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-lg font-medium text-white mb-1">
              Username
            </label>
            <input
              type="text"
              {...register("name", { required: "Username is required" })}
              className="w-full px-3 py-2 bg-[#0E4F61] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 bg-[#0E4F61] rounded-md cursor-not-allowed text-white"
              readOnly
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg font-medium text-white mb-1">
              Phone
            </label>
            <input
              type="tel"
              {...register("mobile")}
              className="w-full px-3 py-2 bg-[#0E4F61] rounded-md cursor-not-allowed text-white"
              readOnly
            />
          </div>

          {/* Current Password */}
          <div>
            <label className="block text-lg font-medium text-white mb-1">
              Current Password
            </label>
            <input
              type="password"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              className="w-full px-3 py-2 bg-[#0E4F61] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
            {errors.currentPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-lg font-medium text-white mb-1">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword")}
              className="w-full px-3 py-2 bg-[#0E4F61] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showModal && (
        <div
          id="modalOverlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
        >
          <div className="relative">
            <img
              src={imagePreview || user.profilePicture}
              alt="Full Profile"
              className="max-w-md w-full rounded-xl shadow-lg"
            />
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full px-3 py-1 shadow hover:bg-gray-100 transition-colors"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
