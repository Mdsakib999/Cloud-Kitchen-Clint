import OrderCard from "./OrderCard";
import { FiRefreshCw } from "react-icons/fi";

const OrderList = ({
  orders,
  originalCount,
  isFetching,
  onRefresh,
  onViewOrder,
  onReorder,
}) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg mb-4">
          {originalCount === 0
            ? "No orders found."
            : "No orders match your filters."}
        </p>
        {originalCount > 0 && (
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">
          Showing {orders.length} of {originalCount} orders
        </div>
        <button
          onClick={onRefresh}
          disabled={isFetching}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <FiRefreshCw className="w-4 h-4" />
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onView={() => onViewOrder(order._id)}
            onReorder={() => onReorder(order)}
          />
        ))}
      </div>
    </>
  );
};

export default OrderList;
