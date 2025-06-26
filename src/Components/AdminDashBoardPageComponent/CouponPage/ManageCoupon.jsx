import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import axiosInstance from "../../../Utils/axios";

const ManageCoupon = () => {
  const [loading, setLoading] = useState(false);

  const [allCoupons, setAllCoupons] = useState([]);

  const fetchCoupons = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/admin", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
    if (res.status === 200) {
      setAllCoupons(res.data);
      setLoading(false);
    } else {
      setLoading(false);
      console.log(res, "Failed to fetch coupons");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // !!! TODO: Replace these with actual edit and delete logic
  const editCoupon = (coupon) => alert("Edit coupon: " + coupon.code);
  const deleteCoupon = (id) => alert("Delete coupon ID: " + id);

  const renderer = ({ hours, minutes, seconds, days, completed }) => {
    if (completed) {
      return <span className="text-red-500 font-semibold">Expired</span>;
    } else {
      const dayLabel = days > 0 ? `${days}d ` : "";
      const time = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      return (
        <span className="text-green-600 font-medium">
          {dayLabel}
          {time}
        </span>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Manage Existing Coupons
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">#</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Coupon Code
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Min Purchase
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Discount
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Type
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Validity
              </th>
              <th className="py-3 px-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {allCoupons &&
              allCoupons.map((coupon, index) => (
                <tr
                  key={coupon._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{coupon.code}</td>
                  <td className="py-3 px-4 ">{coupon.minimumPurchase} TK</td>
                  <td className="py-3 px-4">
                    {coupon.discountAmount}{" "}
                    {coupon.type === "percentage" ? "%" : "Tk"}{" "}
                  </td>
                  <td className="py-3 px-4 capitalize">{coupon.type}</td>
                  <td className="py-3 px-4 ">
                    <Countdown
                      date={new Date(coupon.endDate)}
                      renderer={renderer}
                    />
                  </td>
                  <td className="py-3 px-4 flex items-center justify-center gap-4">
                    <button
                      onClick={() => editCoupon(coupon)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteCoupon(coupon._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupon;
