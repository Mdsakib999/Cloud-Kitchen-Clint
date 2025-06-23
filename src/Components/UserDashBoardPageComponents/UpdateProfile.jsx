import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Edit3,
  Trash2,
  Camera,
  X,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import showToast from "../../utils/ShowToast";
import { useAuth } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import axiosInstance from "../../Utils/axios";
import { useLocation, useNavigate } from "react-router-dom";

export const UpdateProfile = () => {
  const { user, setUser, forgotPassword, logout } = useAuth();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  console.log("user==>", user);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Set initial form values when modal opens
  useEffect(() => {
    if (user && showUpdateModal) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("address", user.address);
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
    const hasAddressChanged = formData.address !== user.address;
    const hasProfilePictureChanged = selectedImage !== null;

    if (
      !hasNameChanged &&
      !hasPhoneChanged &&
      !hasAddressChanged &&
      !hasProfilePictureChanged
    ) {
      showToast({
        title: "No changes detected.",
        icon: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const updateData = new FormData();

      if (hasNameChanged) updateData.append("name", formData.name);
      if (hasPhoneChanged) updateData.append("phone", formData.phone);
      if (hasAddressChanged) updateData.append("address", formData.address);
      if (hasProfilePictureChanged)
        updateData.append("profilePicture", selectedImage);

      const updatedResult = await axiosInstance.put(
        `/auth/${user?._id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("updatedResult", updatedResult);
      setUser(updatedResult.data);
      showToast({
        title: "Profile updated successfully!",
        icon: "success",
      });

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
        const result = await axiosInstance.delete(`/auth/${user?._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (result?.data?.success) {
          await logout();
          setUser(null);
          showToast({
            title: "Account deleted successfully!",
            icon: "success",
          });
          navigate("/");
        }
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

  const handlePasswordChange = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reset your password? A reset link will be sent to your email.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reset",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "bg-gray-800 text-white rounded-2xl",
        title: "text-white font-bold",
        content: "text-gray-300",
        confirmButton:
          "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition",
        cancelButton:
          "bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        await forgotPassword(email);
        navigate("/view-reset-password", {
          state: {
            email: email,
            from: from,
          },
        });
      } catch (error) {
        console.error(error);
        showToast({
          title: "Failed to send reset link.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent mb-4">
            User Profile
          </h1>
          <p className="text-slate-300 text-lg">
            Manage your account information and settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-emerald-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Cover Section with Gradient */}
          <div className="h-40 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-800 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 -mt-20">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-800 p-1">
                  <img
                    src={user?.profilePicture}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 animate-pulse rounded-full border-4 border-white shadow-lg flex items-center justify-center"></div>
              </div>

              {/* User Info */}
              <div className="text-center lg:text-left flex-1">
                <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-white mb-2">
                  {user?.name}
                </h2>
                <p className="text-slate-300 text-sm md:text-lg mb-2 break-all">
                  {user?.email}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-400">
                  <Calendar size={16} />
                  <span className="text-sm">
                    Member since{" "}
                    {user?.createdAt
                      ? new Date(user?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4 lg:mt-0">
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="cursor-pointer text-sm md:text-base flex items-center gap-2 px-3 py-1.5 md:px-6 md:py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Edit3 size={20} />
                  Update Profile
                </button>
                <button
                  onClick={handleDeleteProfile}
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-3 py-1.5 md:px-6 md:py-3 rounded-xl transition-all duration-300 shadow-lg ${
                    isSubmitting
                      ? "bg-red-400 cursor-not-allowed"
                      : "cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transform hover:-translate-y-0.5 hover:shadow-xl"
                  }`}
                >
                  <Trash2 size={20} />
                  {isSubmitting ? "Deleting..." : "Delete Profile"}
                </button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-emerald-800 rounded-full"></div>
                  Contact Information
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-400 text-sm font-medium">
                          Full Name
                        </p>
                        <p className="text-white text-sm md:text-lg font-semibold break-all">
                          {user?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Mail size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-400 text-sm font-medium">
                          Email Address
                        </p>
                        <p className="text-white text-sm md:text-lg font-semibold break-all">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                        <Phone size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-slate-400 text-sm font-medium">
                              Phone Number
                            </p>
                            <p className="text-white text-lg font-semibold">
                              {user?.phone || (
                                <span className="italic text-slate-400 text-base">
                                  No phone added
                                </span>
                              )}
                            </p>
                          </div>
                          {!user?.phone && (
                            <button
                              className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                              onClick={() => setShowUpdateModal(true)}
                            >
                              Add Number
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address & Actions */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                  Address & Settings
                </h3>

                {/* Address */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-slate-400 text-sm font-medium">
                            Address
                          </p>
                          <p className="text-white text-lg leading-relaxed mt-1">
                            {user?.address || (
                              <span className="italic text-slate-400 text-base">
                                No address added
                              </span>
                            )}
                          </p>
                        </div>
                        {!user?.address && (
                          <button
                            className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors ml-4"
                            onClick={() => setShowUpdateModal(true)}
                          >
                            Add Address
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Change Password */}
                {user?.provider === "password" && (
                  <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl p-6 border border-indigo-500/20">
                    <h4 className="text-white font-semibold mb-2">
                      Security Settings
                    </h4>
                    <p className="text-slate-300 text-sm mb-4">
                      Keep your account secure by updating your password
                      regularly.
                    </p>
                    <button
                      className="text-emerald-200 hover:text-emerald-300 font-medium text-sm transition-colors cursor-pointer"
                      onClick={() => handlePasswordChange(user?.email)}
                    >
                      Change Password →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Update Profile Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-emerald-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Update Profile
                    </h3>
                    <p className="text-slate-400">
                      Make changes to your profile information
                    </p>
                  </div>
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors group cursor-pointer"
                  >
                    <X
                      size={24}
                      className="text-slate-400 group-hover:text-white"
                    />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Profile Picture */}
                  <div className="text-center">
                    <div className="relative inline-block group">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-500 p-1">
                        <img
                          src={imagePreview || user?.profilePicture}
                          alt="Profile Preview"
                          className="w-full h-full rounded-full object-cover bg-white"
                        />
                      </div>
                      <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-emerald-800 text-white p-3 rounded-full cursor-pointer hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg transform hover:scale-110">
                        <Camera size={18} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-slate-400 text-sm mt-4">
                      Click the camera icon to change your photo
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full px-4 py-3 bg-emerald-700/50 border border-slate-600 rounded-xl text-slate-400 cursor-not-allowed"
                        readOnly
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3">
                        Address
                      </label>
                      <textarea
                        {...register("address")}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex gap-4 pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setShowUpdateModal(false)}
                      className="cursor-pointer flex-1 px-6 py-3 border border-white/20 text-slate-300 rounded-xl hover:bg-white/5 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isSubmitting
                          ? "bg-blue-500/50 cursor-not-allowed text-white/70"
                          : "cursor-pointer bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      }`}
                    >
                      <Save size={20} />
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
