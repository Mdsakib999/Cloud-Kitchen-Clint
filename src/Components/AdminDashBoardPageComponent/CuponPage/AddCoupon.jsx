import React, { useEffect, useState } from "react";
import axios from "axios";

const AddCoupon = () => {
  const [coupons, setCoupons] = useState([]);
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

  const fetchCoupons = async () => {
    const res = await axios.get("/api/coupons");
    setCoupons(res.data);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/coupons/create", formData);
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
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Coupon Manager
      </h2>

      {/* Coupon Form */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="code"
          placeholder="Coupon Code"
          value={formData.code}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          type="number"
          name="discountAmount"
          placeholder="Discount Amount"
          value={formData.discountAmount}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="flat">Flat</option>
          <option value="percentage">Percentage</option>
        </select>

        <input
          type="datetime-local"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          type="datetime-local"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="number"
          name="usageLimit"
          placeholder="Usage Limit"
          value={formData.usageLimit}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="number"
          name="minPurchaseAmount"
          placeholder="Min Purchase Amount"
          value={formData.minPurchaseAmount}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <label className="flex items-center text-gray-700">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2 rounded border-gray-300 focus:ring-blue-500"
          />
          Active
        </label>

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 shadow"
        >
          Create Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;
