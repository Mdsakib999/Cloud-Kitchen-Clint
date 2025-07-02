import { useParams } from "react-router-dom";
import { CustomerInfoCard } from "./CustomerInfoCard";
import { OrderItemsTable } from "./OrderItemsTable";
import { useState, useEffect } from "react";
import { OrderHistoryTimeline } from "./OrderHistoryTimeline";
import DeliveryTracker from "./DeliveryTracker";
import toast from "react-hot-toast";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "../../../redux/orderSlice";

export const OrderDetails = () => {
  const { id: orderId } = useParams();
  console.log(orderId);

  const { data: fetchedOrder, isLoading: isFetching } = useGetOrderByIdQuery(
    orderId,
    {
      skip: !orderId,
    }
  );

  const currentOrder = fetchedOrder;

  const [orderStatus, setOrderStatus] = useState(
    currentOrder?.order_status || "pending"
  );

  const [updateOrder] = useUpdateOrderMutation();

  useEffect(() => {
    if (fetchedOrder?.order_status) {
      setOrderStatus(fetchedOrder.order_status);
    }
  }, [fetchedOrder]);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateOrder({
        id: currentOrder._id,
        orderData: { order_status: newStatus },
      }).unwrap();

      toast.success("Order status updated!", {
        className: "font-serif text-center",
      });
    } catch (error) {
      toast.error("Failed to update order.", {
        className: "font-serif text-center",
      });
    }
  };

  if (!currentOrder) {
    return <div className="text-xl min-h-screen">Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6 mt-16 lg:mt-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Order ID: OID{currentOrder._id.slice(-4)}
        </h1>

        <div className="flex gap-2">
          <select
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(e.target.value);
              handleStatusChange(e.target.value);
            }}
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

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <CustomerInfoCard
            name={currentOrder?.name}
            email={currentOrder?.email}
            note={currentOrder?.additionalInfo}
            phone={currentOrder?.phone}
            address={currentOrder?.address}
          />
        </div>

        <div className="w-full lg:w-3/4">
          <OrderItemsTable
            items={currentOrder?.items}
            discountPrice={currentOrder?.discountPrice}
          />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3">
        <OrderHistoryTimeline
          orderTime={currentOrder?.createdAt}
          status={orderStatus}
          isPaid={currentOrder?.isPaid}
        />
        {/* !!! TODO: IN FUTURE */}
        <div className="lg:col-span-2">
          <DeliveryTracker />
        </div>
      </div>
    </div>
  );
};
