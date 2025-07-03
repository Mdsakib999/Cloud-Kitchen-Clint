import { MdOutlineClose } from "react-icons/md";
import { formatDate } from "../../utils/formatDate";
import { useGetOrderByIdQuery } from "../../redux/orderSlice";
import { Loader } from "../SharedComponent/Loader";
import { GetStatusColor } from "../SharedComponent/GetStatusColor";
import { GetPaymentStatusColor } from "../SharedComponent/GetPaymentStatusColor";

const OrderDetailsModal = ({ orderId, onClose }) => {
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useGetOrderByIdQuery(orderId, {
    skip: !orderId,
  });

  // Show loader while loading or if orderId is not available
  if (isLoading || !orderId) {
    return <p>loading...</p>;
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
          className="rounded-2xl shadow-xl w-full max-w-md p-6 bg-bg-primary text-white border border-bg-cart"
        >
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
            <p className="text-white mb-4">
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
    return <Loader comp_Name={"Order Details"} />;
  }

  const status = order?.order_status || "unknown";
  const paymentStatus = order?.isPaid ? "paid" : "pending";
  const originalTotal = (order.totalPrice || 0) + (order.discountPrice || 0);

  return (
    <div
      id="modalOverlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-2xl p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl shadow-xl w-full max-w-5xl scrollbar-hide max-h-[90vh] overflow-y-auto bg-bg-primary text-white border border-bg-cart"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-primary">Order Details</h2>
              <p className="text-md text-white mt-1">
                Order Serial:{" "}
                <span className="font-semibold text-primary text-lg">
                  OID{order.orderNumber || order._id?.slice(-4)}
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-primary transition"
            >
              <MdOutlineClose className="w-6 h-6" />
            </button>
          </div>

          {/* Status & Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-bg-input p-4 rounded-xl">
              <p className="text-sm text-white mb-1">Order Status</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${GetStatusColor(
                  status
                )}`}
              >
                {status.replace("_", " ").toUpperCase()}
              </span>
            </div>
            <div className="bg-bg-input p-4 rounded-xl">
              <p className="text-sm text-white mb-1">Payment Status</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${GetPaymentStatusColor(
                  paymentStatus
                )}`}
              >
                {paymentStatus.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Customer Details */}
          <h3 className="text-lg font-semibold text-primary mb-3">
            Shipping Address
          </h3>
          <div className="mb-6 bg-bg-input p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">
              Customer Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Customer</p>
                <p className="text-white font-medium">{order.name}</p>
              </div>

              <div>
                <p className="text-slate-400">Phone</p>
                <p className="text-white font-medium">{order.phone}</p>
              </div>

              <div>
                <p className="text-slate-400">Payment Method</p>
                <p className="text-white capitalize font-medium">
                  {order.paymentMethod}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Order Date</p>
                <p className="text-white font-medium">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              {order.deliveredAt && (
                <div>
                  <p className="text-slate-400">Delivered At</p>
                  <p className="text-white font-medium">
                    {formatDate(order.deliveredAt)}
                  </p>
                </div>
              )}

              <div className="sm:col-span-2">
                <p className="text-slate-400">Address</p>
                <p className="text-white font-medium">
                  {order.address}, {order.city}, {order.country}
                </p>
              </div>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Ordered Items
            </h3>
            <div className="space-y-6">
              {Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map((item, index) => {
                  const addonsTotal =
                    item.addons?.reduce(
                      (sum, addon) => sum + addon.price * addon.qty,
                      0
                    ) || 0;

                  const itemTotal = item.price * item.qty + addonsTotal;

                  return (
                    <div
                      key={index}
                      className="bg-bg-input rounded-2xl border border-bg-cart p-5 shadow-inner"
                    >
                      {/* Item Info */}
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-lg font-semibold text-white mb-1">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            Quantity:{" "}
                            <span className="text-white">{item.qty}</span> × ৳
                            {item.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-300">Subtotal</p>
                          <p className="text-lg font-semibold text-primary">
                            ৳{item.price * item.qty}
                          </p>
                        </div>
                      </div>

                      {/* Addons */}
                      {item.addons?.length > 0 && (
                        <div className="mt-4 bg-bg-secondary rounded-lg p-4 border-l-4 border-orange-400">
                          <p className="text-sm font-semibold text-orange-400 mb-2">
                            Addons:
                          </p>
                          <ul className="space-y-1">
                            {item.addons.map((addon, aIndex) => (
                              <li
                                key={aIndex}
                                className="flex justify-between text-sm text-gray-300"
                              >
                                <span>
                                  {addon.name} × {addon.qty}
                                </span>
                                <span>৳{addon.price * addon.qty}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Total */}
                      <div className="border-t border-white/10 mt-4 pt-4 flex justify-end">
                        <p className="text-sm text-white font-medium">
                          Item Total:{" "}
                          <span className="text-primary font-bold">
                            ৳{itemTotal}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-white text-sm">
                  No items found in this order.
                </p>
              )}
            </div>
          </div>

          {/* Total Amount */}
          <div className="mt-6 border-t border-bg-cart pt-6">
            <div className="max-w-md ml-auto space-y-3 me-3">
              {/* Original Total */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-300">Subtotal</p>
                <p className="text-sm font-semibold text-white">
                  ৳{originalTotal}
                </p>
              </div>

              {/* Coupon */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-300">Coupon</p>
                <p className="text-sm font-semibold text-white">
                  {order.isCouponApplied ? order.couponCode : "No"}
                </p>
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-300">Discount</p>
                <p className="text-sm font-semibold text-red-400">
                  -৳{order.discountPrice || 0}
                </p>
              </div>

              {/* Delivery Charge */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-300">Delivery Charge</p>
                <p className="text-sm font-semibold text-orange-400">
                  ৳{order.deliveryCharge || 0}
                </p>
              </div>

              {/* Final Total */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
                <p className="text-lg font-bold text-white">Total Amount</p>
                <p className="text-lg font-bold text-primary">
                  ৳{order.totalPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
