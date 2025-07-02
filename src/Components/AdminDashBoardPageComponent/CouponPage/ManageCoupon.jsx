import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import axiosInstance from "../../../Utils/axios";
import { EditIcon } from "lucide-react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import CouponEditModal from "./CouponEditModal";
import { formatDate } from "../../../utils/formatDate";
import { Loader } from "../../SharedComponent/Loader";

const ManageCoupon = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [allCoupons, setAllCoupons] = useState([]);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        setAllCoupons(res.data);
      }
    } catch (error) {
      console.log("Failed to fetch coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleSaveCoupon = async (updatedCoupon) => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(
        `/admin/${updatedCoupon._id}`,
        updatedCoupon,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Coupon updated successfully.",
          icon: "success",
        });
        fetchCoupons();
      }
    } catch (error) {
      console.log("Failed to update coupon:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update coupon. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCoupon(null);
  };

  const handleDeleteCoupon = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the coupon!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const res = await axiosInstance.delete(`/admin/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Coupon has been deleted.",
              icon: "success",
            });
            fetchCoupons();
          }
        } catch (error) {
          console.log("Failed to delete coupon:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete coupon. Please try again.",
            icon: "error",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  if (loading) {
    return <Loader comp_Name={"coupons"} />;
  }

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-2xl shadow-lg mt-10 font-inter">
      <h2 className="text-3xl font-bold text-gray-800 border-b pb-2 font-inknut mb-6">
        Manage Existing Coupons
      </h2>
      <div className="overflow-x-auto flex flex-col items-center justify-center">
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
                Start - End Date
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
                  className="border-t border-gray-200 hover:bg-gray-50 text-center"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{coupon.code}</td>
                  <td className="py-3 px-4">{coupon.minPurchaseAmount} TK</td>
                  <td className="py-3 px-4">
                    {coupon.discountAmount}{" "}
                    {coupon.type === "percentage" ? "%" : "Tk"}
                  </td>
                  <td className="py-3 px-4 capitalize">{coupon.type}</td>
                  <td className="py-3 px-4 capitalize">
                    {formatDate(coupon.startDate)} -{" "}
                    {formatDate(coupon.endDate)}
                  </td>
                  <td className="py-3 px-4 tracking-wider text-sm">
                    <p className="flex flex-col items-center">
                      <Countdown
                        date={new Date(coupon.endDate)}
                        renderer={({
                          days,
                          hours,
                          minutes,
                          seconds,
                          completed,
                        }) =>
                          completed ? (
                            <span className="text-red-500 font-semibold">
                              Expired
                            </span>
                          ) : (
                            <span className="text-emerald-600 font-semibold">
                              {days}d : {hours}h : {minutes}m : {seconds}s
                            </span>
                          )
                        }
                      />
                    </p>
                  </td>
                  <td className="py-3 px-4 flex items-center justify-center gap-4">
                    <button
                      onClick={() => handleEditCoupon(coupon)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <EditIcon size={20} />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => handleDeleteCoupon(coupon._id)}
                      className={`${
                        loading ? "text-red-400" : "text-red-600"
                      } hover:text-red-800 cursor-pointer`}
                    >
                      <MdDelete size={24} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedCoupon && (
        <CouponEditModal
          coupon={selectedCoupon}
          onClose={handleCloseModal}
          onSave={handleSaveCoupon}
        />
      )}
    </div>
  );
};

export default ManageCoupon;
