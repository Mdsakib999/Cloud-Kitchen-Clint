import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  const { state: order } = useLocation();
  console.log(order);

  if (!order) {
    return (
      <div className="font-serif flex flex-col items-center justify-center min-h-screen text-center bg-emerald-950">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-500 mb-4">
          No Order Data Found
        </h1>
        <Link
          to="/"
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="font-serif flex flex-col items-center justify-center min-h-screen bg-emerald-950 pt-40 pb-28 px-2 sm:px-4">
      <FaCheckCircle className="text-emerald-400 text-5xl mb-6" />

      <h1 className="text-2xl sm:text-3xl font-bold text-emerald-100 mb-3 text-center">
        Thank You, {order.name}!
      </h1>

      <p className="text-emerald-200 text-center max-w-lg mb-8 text-sm sm:text-base">
        Your order has been placed successfully! Your OrderId{" "}
        <span className="font-inter">
          (OID
          {order._id.slice(-4)})
        </span>{" "}
        . It’s on its way to
        <span className="font-semibold">
          {" "}
          {order.address}, {order.city}
        </span>
        . We’ll call you soon to confirm your order — thanks for your patience!
      </p>

      <div className="w-full max-w-3xl bg-emerald-900/80 shadow-lg rounded-2xl p-3 sm:p-6 mb-6 flex flex-col gap-6">
        <h2 className="text-lg sm:text-xl font-semibold text-emerald-100 mb-2 sm:mb-4 text-center">
          Order Summary
        </h2>

        <div className="flex flex-col bg-emerald-950 rounded-lg gap-4">
          {order.items?.map((item, index) => {
            const itemTotal =
              item.qty * item.price +
              (item.addons?.reduce((sum, addon) => sum + addon.price, 0) || 0);
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-emerald-800 sm:gap-6 p-3 sm:p-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-emerald-100">
                    {item.name}{" "}
                    <span className="font-inter text-primary">
                      ({item.qty} x ৳{item.price})
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-emerald-100 mt-1">
                    {item.addons?.length > 0 && (
                      <div className="text-primary">
                        <span>Add-ons:</span>
                        {item.addons.map((addon, idx) => (
                          <div key={idx} className="ml-2">
                            {addon.name}{" "}
                            <span className="font-inter">
                              (1 x ৳{addon.price})
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {item.additionalInfo && (
                    <p className="text-xs text-emerald-300 mt-1 italic">
                      Note: {item.additionalInfo}
                    </p>
                  )}
                </div>
                <div className="text-primary text-sm sm:text-base font-bold font-inter">
                  ৳ {itemTotal}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <div className="flex-1 bg-emerald-950 p-3 rounded-lg border border-emerald-700">
            <h3 className="text-base font-semibold text-emerald-200 mb-2">
              Order Details
            </h3>
            <div className="text-emerald-100 space-y-1 text-sm">
              {/* <p className="flex justify-between">
                <span className="font-semibold">Total Price:</span>{" "}
                <span className="font-inter">৳ {order.totalPrice}</span>
              </p> */}
              <p className="flex justify-between">
                <span className="font-semibold">Discount:</span>{" "}
                <span className="font-inter">৳ {order.discountPrice}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Payment Method:</span>{" "}
                <span>{order.paymentMethod}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Order Status:</span>
                <span
                  className={`font-semibold ${
                    order.order_status === "accepted"
                      ? "text-emerald-400"
                      : "text-yellow-400"
                  }`}
                >
                  {order.order_status}
                </span>
              </p>
              {order.totalPrice < 1599 && (
                <p className="flex justify-between">
                  <span className="font-semibold">Shipping:</span>{" "}
                  <span className="font-inter">৳ 100</span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="text-xl flex items-center justify-between text-emerald-200 px-2">
          <span>Total:</span>{" "}
          <span className="font-inter">৳ {order.totalPrice}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-3">
        <Link to="/dashboard/order">
          <button className="cursor-pointer px-10 py-3 mt-5 rounded hover:bg-primary hover:text-white bg-white text-black">
            Track Order
          </button>
        </Link>
        <Link to="/menu">
          <button className="cursor-pointer px-10 py-3 mt-5 rounded bg-primary text-white hover:bg-white hover:text-black">
            Buy More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
