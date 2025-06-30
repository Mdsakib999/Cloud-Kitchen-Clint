import { useLocation } from "react-router-dom";
import { CustomerInfoCard } from "./CustomerInfoCard";
import { OrderItemsTable } from "./OrderItemsTable";
import { useState } from "react";
import { OrderHistoryTimeline } from "./OrderHistoryTimeline";
import DeliveryTracker from "./DeliveryTracker";

export const OrderDetails = () => {
  const [orderStatus, setOrderStatus] = useState("pending");
  const location = useLocation();
  const order = location.state || {};
  console.log(order);

  if (!order) {
    return <div className="text-xl min-h-screen">Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6 mt-16 lg:mt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Order ID: #OID{order._id.slice(-4)}
        </h1>

        <div className="flex gap-2">
          {/* Order cancel option */}
          {/* <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            Cancel Order
          </button> */}

          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="cancelled">Cancelled</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivering">Delivering</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Main Content: Customer & Order Items */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
        {/* Left: Customer Info & Note */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <CustomerInfoCard
            name={order?.name}
            email={order?.email}
            note={order?.additionalInfo}
            phone={order?.phone}
            address={order?.address}
          />
        </div>

        {/* Right: Order Items */}
        <div className="w-full lg:w-3/4">
          <OrderItemsTable
            items={order?.items}
            discountPrice={order?.discountPrice}
          />
        </div>
      </div>

      {/* Timeline & Delivery */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2">
        <OrderHistoryTimeline
          orderTime={order?.createdAt}
          status={order?.order_status}
          isPaid={order?.isPaid}
        />
        <DeliveryTracker />
      </div>
    </div>
  );
};
