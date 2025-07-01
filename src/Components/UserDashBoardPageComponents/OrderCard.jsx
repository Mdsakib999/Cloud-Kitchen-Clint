import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { GetStatusColor } from "../SharedComponent/GetStatusColor";
import { GetPaymentStatusColor } from "../SharedComponent/GetPaymentStatusColor";

const OrderCard = ({ order, onView, onCancel, onReorder, onTrack }) => {
  const status = order.status || order.order_status || "unknown";
  const isPaid = order.isPaid ? "paid" : "pending";

  return (
    <div className="rounded-2xl shadow-md p-6 bg-bg-tertiary text-secondary transition-transform">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Order Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h3 className="text-xl font-bold text-primary">
              OID{order.orderNumber || order._id?.slice(-4)}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${GetStatusColor(
                status
              )}`}
            >
              Status: {status.replace("_", " ").toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${GetPaymentStatusColor(
                isPaid
              )}`}
            >
              Payment: {isPaid.toUpperCase()}
            </span>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-5">
            <div>
              <p className="text-secondary">Name</p>
              <p className="font-semibold text-white">{order.name}</p>
            </div>
            <div>
              <p className="text-secondary">Order Date</p>
              <p className="font-semibold text-white">
                {formatDate(order.createdAt, true)}
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
              <p className="font-semibold text-tertiary">৳{order.totalPrice}</p>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-sm text-secondary mb-2">Items:</p>
            <div className="flex flex-wrap gap-2">
              {order.items.slice(0, 3).map((item, index) => (
                <span
                  key={index}
                  className="bg-bg-input text-white px-2 py-1 rounded-full text-xs"
                >
                  {item.name} ×{item.qty}
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
          {status === "pending" && (
            <button
              onClick={() => onCancel(order._id)}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
            >
              Cancel Order
            </button>
          )}
          <button
            onClick={() => onView(order._id)}
            className="px-4 py-2 bg-tertiary text-white text-sm rounded-lg hover:bg-opacity-90"
          >
            View Details
          </button>
          {["accepted", "preparing", "delivering"].includes(status) && (
            <Link
              to={`/order-track/${order._id}`}
              onClick={() => onTrack(order)}
              className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-opacity-90"
            >
              Track order
            </Link>
          )}

          {status === "delivered" && (
            <button
              onClick={() => onReorder(order)}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-opacity-90"
            >
              Reorder
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
