import { Package } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../redux/orderSlice";
import StatusSteps from "./StatusSteps";
import BillingInfo from "./BillingInfo";
import OrderSummary from "./OrderSummary";
import RiderInfo from "./RiderInfo";
import { Loader } from "../../Components/SharedComponent/Loader";

const TrackOrder = () => {
  const { id } = useParams();
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetOrderByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) return <Loader comp_Name="Track Order" />;
  if (isError)
    return (
      <div className="pt-36 text-center text-red-500">
        Error: {error?.data?.message || "Failed to fetch order"}
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 md:px-8 py-6 md:py-12 text-white pt-24 md:pt-36">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-orange-500 rounded-2xl">
              <Package className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h1 className="text-2xl lg:text-3xl md:text-4xl font-bold">
              Track Your Order
            </h1>
          </div>
          <p className="text-sm lg:text-base text-gray-400 mt-2">
            Get real-time updates on your order status
          </p>
        </div>

        <StatusSteps
          status={orders.order_status}
          orderId={orders._id}
          createdAt={orders.createdAt}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <BillingInfo order={orders} />
          <OrderSummary order={orders} />
        </div>

        <div className="mt-6">
          <RiderInfo order={orders} />
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
