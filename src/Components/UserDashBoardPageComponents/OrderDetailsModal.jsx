import { MdOutlineClose } from "react-icons/md";
import { formatDate } from "../../utils/formatDate";
import { useGetOrderByIdQuery } from "../../redux/orderSlice";
import { Loader } from "../SharedComponent/Loader";

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

const OrderDetailsModal = ({ orderId, onClose }) => {
  console.log("OrderDetailsModal orderId:", orderId);

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useGetOrderByIdQuery(orderId, {
    skip: !orderId,
  });

  console.log("Order data:", order);

  // Show loader while loading or if orderId is not available
  if (isLoading || !orderId) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-2xl p-4">
        <Loader />
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-2xl p-4"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="rounded-2xl shadow-xl w-full max-w-md p-6 bg-bg-primary text-secondary border border-bg-cart"
        >
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
            <p className="text-secondary mb-4">
              {error?.data?.message || "Failed to load order details"}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-bg-cart text-white rounded-lg hover:bg-tertiary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loader if no order data yet
  if (!order) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-2xl p-4">
        <Loader />
      </div>
    );
  }

  const status = order?.order_status || "unknown";
  const paymentStatus = order?.isPaid ? "paid" : "pending";

  return (
    <div
      id="modalOverlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-2xl p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl shadow-xl w-full max-w-5xl scrollbar-hide max-h-[90vh] overflow-y-auto bg-bg-primary text-secondary border border-bg-cart"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-primary">Order Details</h2>
              <p className="text-sm text-secondary mt-1">
                #OID{order.orderNumber || order._id?.slice(-4)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-secondary hover:text-primary transition"
            >
              <MdOutlineClose className="w-6 h-6" />
            </button>
          </div>

          {/* Status & Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-bg-input p-4 rounded-xl">
              <p className="text-sm text-secondary mb-1">Order Status</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  status
                )}`}
              >
                {status.replace("_", " ").toUpperCase()}
              </span>
            </div>
            <div className="bg-bg-input p-4 rounded-xl">
              <p className="text-sm text-secondary mb-1">Payment Status</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getPaymentStatusColor(
                  paymentStatus
                )}`}
              >
                {paymentStatus.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-secondary">Customer</p>
                <p className="font-medium text-white">{order.name}</p>
              </div>
              <div>
                <p className="text-sm text-secondary">Payment Method</p>
                <p className="font-medium text-white capitalize">
                  {order.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary">Order Date</p>
                <p className="font-medium text-white">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              {order.deliveredAt && (
                <div>
                  <p className="text-sm text-secondary">Delivered At</p>
                  <p className="font-medium text-white">
                    {formatDate(order.deliveredAt)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Customer Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-3">
              Shipping Address
            </h3>
            <div className="bg-bg-input p-4 rounded-xl space-y-1">
              <p className="font-medium text-white">{order.name}</p>
              <p className="text-secondary">{order.phone}</p>
              <p className="text-secondary">
                {order.address}, {order.city}, {order.country}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-3">
              Ordered Items
            </h3>
            <div className="space-y-3">
              {Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-bg-input rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-secondary">
                        Quantity: {item.qty}
                      </p>
                    </div>
                    <p className="font-medium text-white">
                      ৳{item.price * item.qty}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No items found in this order.</p>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-bg-cart pt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-white">Total Amount</p>
              <p className="text-xl font-bold text-tertiary">
                ৳{order.totalPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
