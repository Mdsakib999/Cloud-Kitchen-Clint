import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Edit3,
  Trash2,
  Camera,
  X,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import showToast from "../../utils/ShowToast";
import { useAuth } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

export const UpdateProfile = () => {
  const { user, setUser } = useAuth();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const currentPassword = watch("currentPassword", "");
  const newPassword = watch("newPassword", "");

  // Set initial form values when modal opens
  useEffect(() => {
    if (user && showUpdateModal) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("adress", user.address);
      setImagePreview(user.profilePicture);
    }
  }, [user, setValue, showUpdateModal]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formData) => {
    const hasNameChanged = formData.name !== user.name;
    const hasPhoneChanged = formData.phone !== user.phone;
    const hasadressChanged = formData.adress !== user.adress;
    const hasNewPassword =
      formData.newPassword && formData.newPassword.length > 0;
    const hasProfilePictureChanged = selectedImage !== null;

    if (
      !hasNameChanged &&
      !hasPhoneChanged &&
      !hasadressChanged &&
      !hasNewPassword &&
      !hasProfilePictureChanged
    ) {
      showToast({
        title: "No changes detected.",
        icon: "error",
      });
      return;
    }

    if (!formData.currentPassword) {
      showToast({
        title: "Current password is required to update profile.",
        icon: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const updateData = new FormData();
      updateData.append("currentPassword", formData.currentPassword);

      if (hasNameChanged) updateData.append("name", formData.name);
      if (hasPhoneChanged) updateData.append("phone", formData.phone);
      if (hasadressChanged) updateData.append("adress", formData.adress);
      if (hasNewPassword)
        updateData.append("newPassword", formData.newPassword);
      if (hasProfilePictureChanged)
        updateData.append("profilePicture", selectedImage);

      await axiosInstance.put("/user/profile", updateData);

      showToast({
        title: "Profile updated successfully!",
        icon: "success",
      });

      // Update user state
      const updatedUser = {
        ...user,
        name: formData.name,
        phone: formData.phone,
        adress: formData.adress,
        profilePicture: selectedImage
          ? URL.createObjectURL(selectedImage)
          : user.profilePicture,
      };
      setUser(updatedUser);

      // Close modal and reset form
      setShowUpdateModal(false);
      reset();
      setSelectedImage(null);
      setImagePreview(null);
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

  const handleDeleteProfile = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setIsSubmitting(true);
      try {
        await axiosInstance.delete("/user/profile");

        showToast({
          title: "Profile deleted successfully!",
          icon: "success",
        });

        // Redirect if needed
        // window.location.href = "/login";
      } catch (error) {
        console.error(error);
        showToast({
          title: "Failed to delete profile.",
          icon: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">User Profile</h1>
          <p className="text-white">
            Manage your account information and settings
          </p>
        </div>
        {/* Profile Card */}
        <div className="bg-bg-tertiary rounded-2xl shadow-xl overflow-hidden]">
          {/* Cover Section */}
          <div className="h-32 bg-gradient-to-r from-bg-secondary to-bg-tertiary" />

          {/* Profile Info Section */}
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={user?.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-bg-primary shadow-lg object-cover"
                />
                <div className="absolute bottom-2 right-0 w-5 h-5 bg-tertiary rounded-full border-2 border-bg-primary" />
              </div>

              {/* User Info */}
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-3xl font-bold text-primary mb-1">
                  {user?.name}
                </h2>
                <p className="text-secondary mb-1">{user?.email}</p>
                <p className="text-sm text-secondary">
                  Member since {user?.joinDate}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-tertiary text-white rounded-lg hover:bg-opacity-90 transition"
                >
                  <Edit3 size={18} />
                  Update Profile
                </button>
                <button
                  onClick={handleDeleteProfile}
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition ${
                    isSubmitting
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  <Trash2 size={18} />
                  {isSubmitting ? "Deleting..." : "Delete Profile"}
                </button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-bg-input] rounded-lg">
                      <User size={20} className="text-primary" />
                      <div>
                        <p className="text-sm text-secondary">Full Name</p>
                        <p className="font-medium text-white">{user?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-bg-input] rounded-lg">
                      <div className="text-primary">📧</div>
                      <div>
                        <p className="text-sm text-secondary">Email Address</p>
                        <p className="font-medium text-white">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-bg-input] rounded-lg">
                      <div className="text-primary">📱</div>
                      <div>
                        <p className="text-sm text-secondary">Phone Number</p>
                        <p className="font-medium text-white">{user?.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Adress
                </h3>
                <div className="p-4 bg-bg-input] rounded-lg">
                  <p className="text-secondary leading-relaxed">
                    {user?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update Profile Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-2xl p-4">
            <div className="bg-bg-tertiary rounded-4xl scrollbar-hide shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-primary">
                    Update Profile
                  </h3>
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="p-2 hover:bg-bg-secondary rounded-full transition-colors"
                  >
                    <X size={24} className="text-secondary" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Profile Picture */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <img
                        src={imagePreview || user?.profilePicture}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-bg-primary shadow-md"
                      />
                      <label className="absolute bottom-0 right-0 bg-primary text-bg-tertiary p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                        <Camera size={16} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-secondary mt-2">
                      Click the camera icon to change photo
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-3 border border-bg-secondary rounded-lg bg-bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full px-4 py-3 border border-bg-secondary rounded-lg bg-bg-secondary text-secondary cursor-not-allowed"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="w-full px-4 py-3 border border-bg-secondary rounded-lg bg-bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Current Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          {...register("currentPassword", {
                            required: "Current password is required",
                          })}
                          className="w-full px-4 py-3 border border-bg-secondary rounded-lg bg-bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary"
                        >
                          {showCurrentPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.currentPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      New Password (optional)
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        {...register("newPassword")}
                        className="w-full px-4 py-3 border border-bg-secondary rounded-lg bg-bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                        placeholder="Leave blank to keep current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary"
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Adress
                    </label>
                    <textarea
                      {...register("adress")}
                      rows={3}
                      className="w-full px-4 py-3 border border-bg-secondary rounded-lg bg-bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowUpdateModal(false)}
                      className="flex-1 px-6 py-3 border border-bg-secondary text-secondary rounded-lg hover:bg-bg-secondary/70 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-bg-tertiary font-medium transition-colors ${
                        isSubmitting
                          ? "bg-primary/50 cursor-not-allowed"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      <Save size={18} />
                      {isSubmitting ? "Updating..." : "Update Profile"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
