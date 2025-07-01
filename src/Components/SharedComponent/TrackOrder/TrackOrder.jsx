import { useEffect, useState } from "react";
import {
  Package,
  User,
  Phone,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  Truck,
  Home,
  Star,
  StickyNote,
} from "lucide-react";
import { mockOrders } from "../../../FakeDB/mockOrder";
import { formatDate } from "../../../utils/formatDate";
import { useParams } from "react-router-dom";

const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const foundOrder = mockOrders.find((order) => order._id === id);
    setOrder(foundOrder);
  }, [id]);

  console.log(order);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "on delivery":
        return "bg-green-100 text-green-700 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusSteps = (currentStatus) => {
    const steps = [
      { id: "pending", label: "Order Confirmed", icon: CheckCircle },
      { id: "preparing", label: "Preparing Food", icon: Clock },
      { id: "on delivery", label: "Out for Delivery", icon: Truck },
      { id: "completed", label: "Delivered", icon: Home },
    ];

    const statusOrder = ["pending", "preparing", "on delivery", "completed"];
    const currentIndex = statusOrder.indexOf(currentStatus.toLowerCase());

    return steps.map((step, index) => ({
      ...step,
      isActive: index <= currentIndex,
      isCurrent: index === currentIndex,
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 text-white pt-36">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="flex gap-4 items-center justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Track Your Order</h1>
          </div>
          <p className="text-lg text-gray-600">
            Enter your order ID to see real-time updates
          </p>
        </div>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      Order #{order.oid}
                    </h2>
                    <p className="text-orange-100">
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.toLowerCase() === "on delivery" && (
                        <Truck className="w-4 h-4 mr-2" />
                      )}
                      {order.status.toLowerCase() === "pending" && (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      {order.status.toLowerCase() === "completed" && (
                        <Home className="w-4 h-4 mr-2" />
                      )}
                      {order.status.toLowerCase() === "cancelled" && (
                        <Clock className="w-4 h-4 mr-2" />
                      )}
                      {order.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="p-8">
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
                  <div
                    className={`absolute top-1/2 left-0 h-0.5 bg-orange-500 -translate-y-1/2 transition-all duration-500`}
                    style={{
                      width: `${
                        ((getStatusSteps(order.status).filter((s) => s.isActive)
                          .length -
                          1) /
                          3) *
                        100
                      }%`,
                    }}
                  ></div>

                  {getStatusSteps(order.status).map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.id}
                        className="relative flex flex-col items-center"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            step.isActive
                              ? "bg-orange-500 text-white shadow-lg"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <p
                          className={`mt-3 text-sm font-medium text-center ${
                            step.isActive ? "text-gray-900" : "text-gray-400"
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

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Order Items & Rider Info */}
              {/* Order Items */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Order Items
                </h3>

                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">৳{item.total}</p>
                        <p className="text-sm text-gray-600">
                          ৳{item.price} each
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Total Amount</p>
                      <p className="text-xl font-bold text-green-900">
                        ৳{order.totalAmount}
                      </p>
                    </div>
                  </div>
                  {order.note && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <StickyNote className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-yellow-700">
                            Special Instructions
                          </p>
                          <p className="text-sm text-yellow-800 mt-1">
                            {order.note}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Rider Info - Only for On Delivery status */}
              {order.status.toLowerCase() === "on delivery" && (
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl shadow-xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-6">
                    Your Delivery Rider
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Mohammad Rahman</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm">4.8 rating</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-green-100">Contact Rider</p>
                        <p className="font-semibold">+8801712345678</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-green-100">Location</p>
                        <p className="font-semibold">
                          5 minutes away from your location
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
