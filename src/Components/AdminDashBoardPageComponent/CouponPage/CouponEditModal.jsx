import { useForm } from "react-hook-form";

const CouponEditModal = ({ coupon, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: coupon.code,
      discountAmount: coupon.discountAmount,
      minPurchaseAmount: coupon.minPurchaseAmount,
      startDate: coupon.startDate.slice(0, 16),
      endDate: coupon.endDate.slice(0, 16),
      usageLimit: coupon.usageLimit,
      type: coupon.type,
      isActive: coupon.isActive,
    },
  });

  const watchStartDate = watch("startDate");
  const watchType = watch("type");

  const onSubmit = (data) => {
    onSave({
      ...data,
      _id: coupon._id,
      discountAmount: parseFloat(data.discountAmount),
      minPurchaseAmount: parseFloat(data.minPurchaseAmount),
      usageLimit: parseInt(data.usageLimit),
    });
    onClose();
  };

  const validateEndDate = (endDate) => {
    if (!watchStartDate || !endDate) return true;
    return (
      new Date(endDate) > new Date(watchStartDate) ||
      "End date must be after start date"
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Coupon</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    {...register("code", {
                      required: "Coupon code is required",
                      minLength: {
                        value: 2,
                        message: "Code must be at least 2 characters",
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-1 outline-none focus:ring-yellow-400 transition-colors ${
                      errors.code ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter coupon code"
                  />
                  {errors.code && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.code.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type
                  </label>
                  <select
                    {...register("type", {
                      required: "Please select discount type",
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-1 outline-none focus:ring-yellow-400 transition-colors ${
                      errors.type ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount ($)</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.type.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Discount Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Discount Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Amount {watchType === "percentage" ? "(%)" : "($)"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("discountAmount", {
                      required: "Discount amount is required",
                      min: {
                        value: 0.01,
                        message: "Discount amount must be greater than 0",
                      },
                      max:
                        watchType === "percentage"
                          ? {
                              value: 100,
                              message: "Percentage cannot exceed 100%",
                            }
                          : undefined,
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-1 outline-none focus:ring-yellow-400  transition-colors ${
                      errors.discountAmount
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.discountAmount && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.discountAmount.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Purchase Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("minPurchaseAmount", {
                      required: "Minimum purchase amount is required",
                      min: {
                        value: 0,
                        message: "Amount cannot be negative",
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-1 outline-none focus:ring-yellow-400 transition-colors ${
                      errors.minPurchaseAmount
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.minPurchaseAmount && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.minPurchaseAmount.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Validity Period */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Validity Period
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    {...register("startDate", {
                      required: "Start date is required",
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-1 outline-none focus:ring-yellow-400 transition-colors ${
                      errors.startDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    {...register("endDate", {
                      required: "End date is required",
                      validate: validateEndDate,
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-1 outline-none focus:ring-yellow-400 transition-colors ${
                      errors.endDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Usage Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Usage Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usage Limit
                  </label>
                  <input
                    type="number"
                    {...register("usageLimit", {
                      required: "Usage limit is required",
                      min: {
                        value: 1,
                        message: "Usage limit must be at least 1",
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-1 outline-none focus:ring-yellow-400 transition-colors ${
                      errors.usageLimit ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter usage limit"
                  />
                  {errors.usageLimit && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.usageLimit.message}
                    </p>
                  )}
                </div>
                <div className="flex  mt-5">
                  <div className="flex items-center h-full">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("isActive")}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Active Coupon
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-6 py-2 text-sm font-medium  bg-red-500 text-white border border-gray-300 rounded-lg hover:bg-red-700 focus:outline-none transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="cursor-pointer px-6 py-2 text-sm font-medium text-white bg-yellow-500 border  rounded-lg hover:bg-yellow-600  transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponEditModal;
