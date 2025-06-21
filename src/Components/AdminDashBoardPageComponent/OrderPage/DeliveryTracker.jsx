import { useState, useEffect } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Package,
  Truck,
} from "lucide-react";

const DeliveryTracker = () => {
  const [animateRoute, setAnimateRoute] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateRoute(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const deliverySteps = [
    { id: 1, label: "Order Placed", icon: Package, completed: true },
    { id: 2, label: "In Transit", icon: Truck, completed: true, active: true },
    { id: 3, label: "Out for Delivery", icon: MapPin, completed: false },
    { id: 4, label: "Delivered", icon: Package, completed: false },
  ];

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <h2 className="text-gray-800 font-medium">Track Orders</h2>
          <div className="w-8 h-8"></div>
        </div>

        {/* Map Container */}
        <div className="relative h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-inner overflow-hidden">
          {/* SVG Route */}
          <svg className="absolute inset-0 w-full h-full z-0">
            <path
              d="M 40 100 Q 100 50 180 80 Q 240 110 300 60"
              stroke="#ef4444"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,3"
              className={`transition-all duration-1000 ease-in-out ${
                animateRoute ? "stroke-dashoffset-0" : "stroke-dashoffset-100"
              }`}
            />
          </svg>

          {/* Start Marker */}
          <div className="absolute left-6 bottom-6 z-10 flex items-center gap-1">
            <div className="w-4 h-4 bg-green-500 rounded-full ring-2 ring-white shadow-md"></div>
            <span className="text-xs text-gray-700 font-medium">Start</span>
          </div>

          {/* Delivery Vehicle */}
          <div className="absolute left-[50%] top-[50%] z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3.172 5.172a4 4 0 015.656 0l1.414 1.414 1.414-1.414a4 4 0 115.656 5.656l-7.07 7.07a1 1 0 01-1.414 0l-7.07-7.07a4 4 0 010-5.656z" />
              </svg>
            </div>
          </div>

          {/* End Marker */}
          <div className="absolute right-6 top-6 z-10 flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-400 rounded-full ring-2 ring-white shadow-md"></div>
            <span className="text-xs text-gray-600 font-medium">
              Destination
            </span>
          </div>

          {/* ETA Label */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 text-xs text-gray-800 rounded-full shadow border border-gray-200 z-20">
            ETA: <span className="font-semibold text-red-500">4.8 mins</span>
          </div>
        </div>
      </div>

      {/* Delivery Progress */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          {deliverySteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center space-y-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  step.completed
                    ? "bg-gray-800 border-gray-800 text-white"
                    : step.active
                    ? "bg-white border-gray-800 text-gray-800"
                    : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                <step.icon className="w-3 h-3" />
              </div>
              <span
                className={`text-xs ${
                  step.completed || step.active
                    ? "text-gray-800"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center py-2">
          <p className="text-gray-600 text-sm">Your order is on the way</p>
          <p className="text-gray-800 font-medium text-sm">
            Estimated arrival: 4-8 mins
          </p>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="px-6 pb-6">
        <h3 className="text-gray-800 font-medium mb-4">Delivery by</h3>
        {/* Avatar + Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-semibold">
            K
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800">
              Kevin Hoba Jr.
            </h4>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              2.5 km away
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center p-4  rounded-lg">
          {/* Phone Button */}
          <button className="flex items-center gap-1 w-full text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs px-3 py-2 rounded-lg transition">
            <Phone className="w-4 h-4" />
            +88 345 6862 86
          </button>

          {/* Message Button */}
          <button className="flex items-center gap-1 w-full bg-gray-800 hover:bg-gray-900 text-white text-xs px-3 py-2 rounded-lg transition">
            <MessageCircle className="w-4 h-4" />
            Message
          </button>

          {/* Delivery Time */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-gray-600" />
            <span>
              Delivery: <span className="font-medium">12:52 PM</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracker;
