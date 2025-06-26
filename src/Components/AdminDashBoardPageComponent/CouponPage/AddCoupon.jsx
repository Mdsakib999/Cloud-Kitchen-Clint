import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../Utils/axios";
import toast from "react-hot-toast";

const AddCoupon = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountAmount: "",
    type: "flat",
    startDate: "",
    endDate: "",
    usageLimit: 1,
    minPurchaseAmount: 0,
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // create coupon
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await axiosInstance.post("/admin/create", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (result.status === 201) {
      toast.success(
        <h1 className="font-serif text-center">Coupon created successfully!</h1>
      );
      setLoading(false);
    } else {
      toast.error(
        <h1 className="font-serif text-center">Failed to create coupon!</h1>
      );
      setLoading(false);
      return;
    }
    setFormData({
      code: "",
      discountAmount: "",
      type: "flat",
      startDate: "",
      endDate: "",
      usageLimit: 1,
      minPurchaseAmount: 0,
      isActive: true,
    });
    fetchCoupons();
  };

  const deleteCoupon = async (id) => {
    await axios.delete(`/api/coupons/${id}`);
    fetchCoupons();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-6 border-b pb-2">
        Create Coupon{" "}
      </h2>

      {/* Coupon Form */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coupon Code
          </label>
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={formData.code}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Amount
          </label>
          <input
            type="number"
            name="discountAmount"
            placeholder="Discount Amount"
            value={formData.discountAmount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="flat">Flat</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Usage Limit
          </label>
          <input
            type="number"
            name="usageLimit"
            placeholder="Usage Limit"
            value={formData.usageLimit}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Purchase Amount
          </label>
          <input
            type="number"
            name="minPurchaseAmount"
            placeholder="Min Purchase Amount"
            value={formData.minPurchaseAmount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2 rounded border-gray-300 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700 font-medium">Active</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer md:col-span-2 bg-primary disabled:bg-gray-400 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 shadow"
        >
          {loading ? "Creating..." : "Create Coupon"}
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;
