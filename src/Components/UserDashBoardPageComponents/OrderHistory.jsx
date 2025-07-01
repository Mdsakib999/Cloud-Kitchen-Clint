import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useGetOrdersByUserQuery } from "../../redux/orderSlice";
import { Loader } from "../SharedComponent/Loader";
import OrderCard from "./OrderCard";
import OrderDetailsModal from "./OrderDetailsModal";
import showToast from "../../utils/ShowToast";

export const OrderHistory = () => {
  const { user } = useAuth();
  const userId = user?._id;

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useGetOrdersByUserQuery(userId, {
    skip: !userId,
  });

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Toast on error
  useEffect(() => {
    if (isError) {
      showToast({
        title: error?.data?.message || "Failed to load orders",
        icon: "error",
      });
    }
  }, [isError, error?.data?.message]);

  // Use useMemo instead of useEffect + state for filtering
  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];

    // Sort by newest first
    let sorted = [...orders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Apply status filter
    if (statusFilter !== "all") {
      sorted = sorted.filter(
        (o) => (o.status || o.order_status) === statusFilter
      );
    }

    // Apply payment filter
    if (paymentFilter !== "all") {
      sorted = sorted.filter(
        (o) =>
          (o.paymentStatus || (o.isPaid ? "paid" : "pending")) === paymentFilter
      );
    }

    return sorted;
  }, [orders, statusFilter, paymentFilter]);

  const handleViewOrder = (id) => {
    setSelectedOrderId(id);
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleClearFilters = () => {
    setStatusFilter("all");
    setPaymentFilter("all");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen py-8 px-4 mt-16 md:mt-0">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-200 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">Track and manage your food orders</p>
        </div>

        {/* Filter Controls */}
        <div className="rounded-2xl shadow-md p-6 mb-6 bg-bg-tertiary">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-bg-secondary rounded-xl p-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Order Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-bg-input text-white border border-bg-cart"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Payment Status
              </label>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-bg-input text-white border border-bg-cart"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="flex items-end justify-end">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-sm text-white bg-bg-cart rounded-lg hover:bg-tertiary"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <p className="text-gray-400 text-center">No orders found.</p>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onView={() => handleViewOrder(order._id)}
              />
            ))
          )}
        </div>

        {/* Order Details Modal */}
        {showModal && selectedOrderId && (
          <OrderDetailsModal
            orderId={selectedOrderId}
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};
