import {
  Package,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const statusSteps = [
  {
    key: "created",
    title: "Order Created",
    icon: Package,
    description: "Your order has been placed successfully",
  },
  {
    key: "payment",
    title: "Payment",
    icon: CreditCard,
    // description set dynamically
  },
  {
    key: "accepted",
    title: "Order Accepted",
    icon: CheckCircle,
    description: "Restaurant has accepted your order",
  },
  {
    key: "preparing",
    title: "Preparing",
    icon: Truck,
    description: "Your food is being prepared",
  },
  {
    key: "ready",
    title: "Ready for Delivery",
    icon: Truck,
    description: "Order is ready for delivery",
  },
  {
    key: "delivering",
    title: "On Delivery",
    icon: Truck,
    description: "Your order is on the way",
  },
  {
    key: "delivered",
    title: "Order Delivered",
    icon: CheckCircle,
    description: "Package delivered successfully",
  },
  {
    key: "cancelled",
    title: "Order Cancelled",
    icon: XCircle,
    description: "Order was cancelled",
  },
];

export const OrderHistoryTimeline = ({
  orderTime,
  status,
  isPaid,
  paymentTime,
  deliveryTime,
  cancelledTime,
}) => {
  const steps = [];
  steps.push({
    ...statusSteps[0],
    completed: true,
    timestamp: orderTime,
  });
  // 2. Payment
  steps.push({
    ...statusSteps[1],
    completed: isPaid,
    timestamp: paymentTime || "-",
    description: isPaid ? "Payment processed and confirmed" : "Payment pending",
  });

  // 3. Status progression
  const statusOrder = [
    "pending",
    "accepted",
    "preparing",
    "ready",
    "delivering",
    "delivered",
    "cancelled",
  ];
  const currentStatusIdx = statusOrder.indexOf(status);

  // Only show up to the current status (or all if delivered/cancelled)
  for (let i = 1; i < statusOrder.length; i++) {
    const s = statusOrder[i];
    if (s === "cancelled" && status !== "cancelled") continue;
    if (
      s === "delivered" &&
      status !== "delivered" &&
      statusOrder.indexOf(status) < statusOrder.indexOf("delivering")
    )
      continue;
    if (statusOrder.indexOf(s) > currentStatusIdx && status !== "cancelled")
      break;
    let completed =
      statusOrder.indexOf(s) < currentStatusIdx ||
      (status === s && s !== "cancelled");
    let timestamp = "-";
    if (s === "delivered" && deliveryTime) timestamp = deliveryTime;
    if (s === "cancelled" && cancelledTime) timestamp = cancelledTime;
    steps.push({
      ...statusSteps.find((st) => st.key === s),
      completed: completed,
      timestamp,
    });
    if (status === "cancelled" && s === "cancelled") break;
    if (status === "delivered" && s === "delivered") break;
  }

  return (
    <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6 lg:w-96 h-fit bg-white">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-600" />
        <h2 className="text-base font-semibold text-gray-800">Order History</h2>
      </div>

      {/* Timeline */}
      <div className="p-4 space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === steps.length - 1;
          return (
            <div key={idx} className="relative flex items-start gap-3">
              {/* Line */}
              {!isLast && (
                <div className="absolute left-5 top-9 h-9 w-px bg-gray-200 z-0" />
              )}

              {/* Icon */}
              <div
                className={`z-10 flex items-center justify-center w-9 h-9 rounded-full border-2 text-sm transition-all duration-200 ${
                  step.completed
                    ? step.key === "cancelled"
                      ? "bg-red-100 border-red-400 text-red-600"
                      : "bg-gray-800 border-gray-800 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-2">
                <div className="flex justify-between items-center mb-0.5">
                  <h3
                    className={`text-sm font-medium ${
                      step.completed
                        ? step.key === "cancelled"
                          ? "text-red-600"
                          : "text-gray-800"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h3>
                  {step.completed && step.key !== "cancelled" && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-600 rounded">
                      Done
                    </span>
                  )}
                  {step.key === "cancelled" && step.completed && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-600 rounded">
                      Cancelled
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-snug">
                  {step.description}
                </p>
                <time className="block text-[10px] text-gray-400 font-mono mt-1">
                  {step.timestamp}
                </time>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
        <span>Tracking progress</span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-800 rounded-full inline-block"></span>
            Completed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-300 rounded-full inline-block"></span>
            Pending
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-red-400 rounded-full inline-block"></span>
            Cancelled
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryTimeline;
