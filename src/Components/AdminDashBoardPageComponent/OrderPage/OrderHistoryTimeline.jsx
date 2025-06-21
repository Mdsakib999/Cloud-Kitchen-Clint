import { Package, CreditCard, Truck, CheckCircle, Clock } from "lucide-react";

const history = [
  {
    title: "Order Created",
    timestamp: "Sat, May 17 2025, 12:20 PM",
    completed: true,
    icon: Package,
    description: "Your order has been placed successfully",
  },
  {
    title: "Payment Success",
    timestamp: "Sat, May 17 2025, 12:27 PM",
    completed: true,
    icon: CreditCard,
    description: "Payment processed and confirmed",
  },
  {
    title: "On Delivery",
    timestamp: "Sat, May 17 2025, 01:24 PM",
    completed: true,
    icon: Truck,
    description: "Your order is on the way",
  },
  {
    title: "Order Delivered",
    timestamp: "Sat, May 17 2025, 01:24 PM",
    completed: false,
    icon: CheckCircle,
    description: "Package will be delivered soon",
  },
];

export const OrderHistoryTimeline = () => {
  return (
    <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6 lg:w-96 h-fit">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-600" />
        <h2 className="text-base font-semibold text-gray-800">Order History</h2>
      </div>

      {/* Timeline */}
      <div className="p-4 space-y-4">
        {history.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === history.length - 1;

          return (
            <div key={idx} className="relative flex items-start gap-3">
              {/* Line */}
              {!isLast && (
                <div className="absolute left-5 top-9 h-9 w-px bg-gray-200 z-0" />
              )}

              {/* Icon */}
              <div
                className={`z-10 flex items-center justify-center w-9 h-9 rounded-full border-2 text-sm ${
                  step.completed
                    ? "bg-gray-800 border-gray-800 text-white"
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
                      step.completed ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h3>
                  {step.completed && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-600 rounded">
                      Done
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
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryTimeline;
