import { CheckCircle, Clock, Truck, Home, X } from "lucide-react";
import { formatDate } from "../../../utils/formatDate";

const StatusSteps = ({ status, orderId, createdAt }) => {
  const getStatusSteps = (status) => {
    const normalizedStatus = status?.toLowerCase() || "";

    if (normalizedStatus === "cancelled") {
      return [
        {
          id: "cancelled",
          label: "Order Cancelled",
          icon: X,
          isActive: true,
          isCurrent: true,
        },
      ];
    }

    const steps = [
      { id: "accepted", label: "Order Confirmed", icon: CheckCircle },
      { id: "preparing", label: "Preparing Food", icon: Clock },
      { id: "delivering", label: "Out for Delivery", icon: Truck },
      { id: "delivered", label: "Delivered", icon: Home },
    ];

    const statusMap = {
      pending: null,
      accepted: "accepted",
      preparing: "preparing",
      ready: "preparing",
      delivering: "delivering",
      "on delivery": "delivering",
      delivered: "delivered",
      completed: "delivered",
    };

    const mappedStepId = statusMap[normalizedStatus];

    if (!mappedStepId) {
      return steps.map((step) => ({
        ...step,
        isActive: false,
        isCurrent: false,
      }));
    }

    const currentIndex = steps.findIndex((step) => step.id === mappedStepId);

    return steps.map((step, index) => ({
      ...step,
      isActive: index <= currentIndex,
      isCurrent: index === currentIndex,
    }));
  };

  const steps = getStatusSteps(status);

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 lg:p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between gap-3">
          <div>
            <h2 className="text-lg lg:text-xl font-bold">Order Status</h2>
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-bold">
              OID{orderId?.slice(-4)}
            </h2>
            <p className="text-sm lg:text-base text-orange-100">
              Placed on {formatDate(createdAt, true)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-6 overflow-x-auto">
        <div className="min-w-[500px] lg:min-w-full flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
          <div
            className={`absolute top-1/2 left-0 h-0.5 bg-orange-500 -translate-y-1/2 transition-all duration-500 z-10`}
            style={{
              width: `${
                ((steps.filter((s) => s.isActive).length - 1) / 3) * 100
              }%`,
            }}
          ></div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="relative flex flex-col items-center w-20 text-center shrink-0"
              >
                <div
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step.isActive
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <p
                  className={`mt-2 text-xs lg:text-sm font-medium ${
                    step.isActive ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatusSteps;
