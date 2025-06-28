import { useState, useEffect } from "react";
import showToast from "../../utils/ShowToast";
import { formatDate } from "../../utils/formatDate";
import { mockOrders } from "../../FakeDB/mockOrder";
import { Loader } from "../SharedComponent/Loader";
import { Link } from "react-router-dom";
import { Cross } from "lucide-react";
import { GrMultiple } from "react-icons/gr";
import { MdOutlineClose } from "react-icons/md";

const getStatusColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    preparing: "bg-orange-100 text-orange-800",
    out_for_delivery: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getPaymentStatusColor = (status) => {
  const colors = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

export const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filter and sort states
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Mock API call to fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      } catch (error) {
        showToast({
          title: "Failed to fetch orders",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter and sort orders
  useEffect(() => {
    let filtered = [...orders];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.paymentStatus === paymentFilter
      );
    }
    setFilteredOrders(filtered);
  }, [orders, statusFilter, paymentFilter]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleReorder = async (order) => {
    try {
      showToast({
        title: "Items added to cart successfully!",
        icon: "success",
      });
    } catch (error) {
      showToast({
        title: "Failed to reorder items",
        icon: "error",
      });
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setOrders(updatedOrders);

      showToast({
        title: "Order cancelled successfully",
        icon: "success",
      });
    } catch (error) {
      showToast({
        title: "Failed to cancel order",
        icon: "error",
      });
    }
  };

  const handleModalClose = (e) => {
    if (e.target.id === "modalOverlay") {
      setShowModal(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-8 px-4 mt-16 md:mt-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-200 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">Track and manage your food orders</p>
        </div>

        {/* Filters */}
        <div className="rounded-2xl shadow-md p-6 mb-6 bg-bg-tertiary">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-bg-secondary rounded-xl p-6">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Order Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-bg-input text-white border border-bg-cart focus:outline-none focus:ring-2 focus:ring-tertiary transition"
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

            {/* Payment Filter */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Payment Status
              </label>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-bg-input text-white border border-bg-cart focus:outline-none focus:ring-2 focus:ring-tertiary transition"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end justify-end">
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setPaymentFilter("all");
                  setSortBy("newest");
                  setDateRange({ start: "", end: "" });
                }}
                className="px-4 py-2 text-sm text-white bg-bg-cart rounded-lg hover:bg-tertiary transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="rounded-lg shadow-sm p-8 text-center bg-bg-secondary">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-200 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or place your first order
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl shadow-md p-6 bg-bg-tertiary text-secondary transition-transform"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold text-primary">
                        #{order.orderNumber}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.replace("_", " ").toUpperCase()}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-5">
                      <div>
                        <p className="text-secondary">Restaurant</p>
                        <p className="font-semibold text-white">
                          {order.restaurantName}
                        </p>
                      </div>
                      <div>
                        <p className="text-secondary">Order Date</p>
                        <p className="font-semibold text-white">
                          {formatDate(order.orderDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-secondary">Items</p>
                        <p className="font-semibold text-white">
                          {order.items.length} items
                        </p>
                      </div>
                      <div>
                        <p className="text-secondary">Total Amount</p>
                        <p className="font-semibold text-tertiary">
                          ৳{order.totalAmount}
                        </p>
                      </div>
                    </div>

                    {/* Item Previews */}
                    <div className="mb-5">
                      <p className="text-sm text-secondary mb-2">Items:</p>
                      <div className="flex flex-wrap gap-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <span
                            key={index}
                            className="bg-bg-input text-white px-2 py-1 rounded-full text-xs"
                          >
                            {item.name} ×{item.quantity}
                          </span>
                        ))}
                        {order.items.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{order.items.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:ml-4">
                    {order.status === "pending" && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-all"
                      >
                        Cancel Order
                      </button>
                    )}
                    {order.status === "out_for_delivery" && (
                      <Link to={`/dashboard/track-order/${order._id}`}>
                        <button className="w-full px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-all">
                          Track Order
                        </button>{" "}
                      </Link>
                    )}

                    <button
                      onClick={() => handleViewOrder(order)}
                      className="px-4 py-2 bg-tertiary text-white text-sm rounded-lg hover:bg-opacity-90 transition-all"
                    >
                      View Details
                    </button>

                    {order.status === "delivered" && (
                      <button
                        onClick={() => handleReorder(order)}
                        className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-opacity-90 transition-all"
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div
          id="modalOverlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-2xl p-4"
          onClick={handleModalClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-2xl shadow-xl w-full max-w-5xl scrollbar-hide max-h-[90vh] overflow-y-auto bg-bg-primary text-secondary border border-bg-cart"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    Order Details
                  </h2>
                  <p className="text-sm text-secondary mt-1">
                    #{selectedOrder.orderNumber}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-secondary hover:text-primary transition"
                >
                  <MdOutlineClose className="w-6 h-6" />
                </button>
              </div>

              {/* Order Status & Payment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-bg-input p-4 rounded-xl">
                  <p className="text-sm text-secondary mb-1">Order Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold  ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <div className="bg-bg-input p-4 rounded-xl">
                  <p className="text-sm text-secondary mb-1">Payment Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold  ${getPaymentStatusColor(
                      selectedOrder.paymentStatus
                    )}`}
                  >
                    {selectedOrder.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Order Info */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-secondary">Restaurant</p>
                    <p className="font-medium text-white">
                      {selectedOrder.restaurantName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary">Payment Method</p>
                    <p className="font-medium text-white capitalize">
                      {selectedOrder.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary">Order Date</p>
                    <p className="font-medium text-white">
                      {formatDate(selectedOrder.orderDate)}
                    </p>
                  </div>
                  {selectedOrder.deliveryDate && (
                    <div>
                      <p className="text-sm text-secondary">Delivery Date</p>
                      <p className="font-medium text-white">
                        {formatDate(selectedOrder.deliveryDate)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Customer Details
                </h3>
                <div className="bg-bg-input p-4 rounded-xl">
                  <p className="font-medium text-white">
                    {selectedOrder.customerDetails.name}
                  </p>
                  <p className="text-secondary">
                    {selectedOrder.customerDetails.phone}
                  </p>
                  <p className="text-secondary">
                    {selectedOrder.customerDetails.address}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-bg-input rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-secondary">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-white">
                        ৳{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-bg-cart pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-white">
                    Total Amount
                  </p>
                  <p className="text-xl font-bold text-tertiary">
                    ৳{selectedOrder.totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
