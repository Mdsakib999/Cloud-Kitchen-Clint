import { useForm } from "react-hook-form";
import {
  DollarSign,
  Tag,
  Shield,
  Truck,
  CheckCircle,
  Package,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectAllCartItems } from "../../redux/cartSlice";
import { useAuth } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import axiosInstance from "../../Utils/axios";
import toast from "react-hot-toast";
import { useCreateOrderMutation } from "../../redux/orderSlice";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [couponLoading, setCouponLoading] = useState(false);
  const [showError, setShowError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      country: "Bangladesh",
      streetAddress: user?.address || "",
      city: "Chattogram",
      phone: user?.phone || "",
      additionalInfo: "",
      couponCode: "",
      paymentMethod: "cash",
    },
  });

  const orderItems = useSelector(selectAllCartItems);
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();

  const subtotal = orderItems.reduce((sum, item) => {
    const addonsTotal =
      item.addons?.reduce((acc, addon) => acc + (addon.price || 0), 0) || 0;
    return sum + (item.price + addonsTotal) * item.quantity;
  }, 0);

  const discountedSubtotal = Math.max(subtotal - discount, 0);
  const shipping = discountedSubtotal >= 1599 ? 0 : 100;
  const total = discountedSubtotal + shipping;

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/admin", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCoupons(res.data.filter((coup) => coup.isActive));
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
      toast.error("Failed to load coupons");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // coupon functionality
  const handleCouponApply = async () => {
    try {
      setCouponLoading(true);
      const res = await axiosInstance.post(
        "/admin/apply",
        { code: couponCode, cartTotal: subtotal },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setDiscount(res.data.discount);
      setAppliedCoupon({ code: couponCode, discount: res.data.discount });
      setCouponCode("");
      toast.success(
        <h1 className="text-center font-serif">Coupon applied successfully</h1>
      );
      setShowError("");
    } catch (error) {
      setShowError(error.response?.data?.error);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleOrder = async (data) => {
    if (!selectedPayment) {
      toast.error(
        <h1 className="text-center font-serif">
          Please select the payment method
        </h1>
      );
      return;
    }
    setPlacingOrder(true);
    const orderPayload = {
      user: user._id,
      name: data.name,
      phone: data.phone,
      country: data.country,
      address: data.streetAddress,
      city: data.city,
      couponCode: appliedCoupon?.code || "",
      isCouponApplied: !!appliedCoupon,
      additionalInfo: data.additionalInfo || "",
      items: orderItems.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        food: item.baseId,
        addons:
          item.addons?.map((addon) => ({
            name: addon.label,
            price: addon.price,
            qty: item.quantity,
          })) || [],
      })),
      totalPrice: total,
      discountPrice: discount,
      paymentMethod: selectedPayment,
    };
    try {
      const result = await createOrder(orderPayload).unwrap();
      if (result.message === "Order created successfully") {
        toast.success(
          <h1 className="font-serif text-center">Order placed successfully!</h1>
        );
        navigate("/order-success", { state: result.order });
      }
      dispatch(clearCart());
      setAppliedCoupon(null);
      setDiscount(0);
      reset();
      setSelectedPayment("");
    } catch (error) {
      toast.error(
        <h1 className="text-center font-serif">
          {error?.data || "Failed to place order"}
        </h1>
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // Reset coupon/discount if cart changes
  useEffect(() => {
    setAppliedCoupon(null);
    setDiscount(0);
  }, [orderItems.length]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-12 w-12 text-teal-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span className="text-teal-400 text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-secondary py-12 px-4 lg:px-8 pt-40">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-emerald-950/20 border border-emerald-600 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Contact Information
              </h2>
              <div className="flex items-center text-sm text-emerald-500">
                <Shield className="w-4 h-4 mr-1" /> Secure checkout
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-transparent text-white focus:outline-none focus:border-teal-500"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\-\s()]+$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-transparent text-white focus:outline-none focus:border-teal-500"
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <input
                  {...register("country", { required: "Country is required" })}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-transparent text-white focus:outline-none focus:border-teal-500"
                  placeholder="Enter country Name"
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="bg-emerald-950/20 border border-emerald-600 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-6">
              <Truck className="w-5 h-5 text-emerald-600 mr-2" />
              <h2 className="text-xl font-semibold text-white">
                Shipping Address
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Street Address
                </label>
                <input
                  {...register("streetAddress", {
                    required: "Street address is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg SIXTH AI INC. gray-700 text-white focus:outline-none focus:border-teal-500"
                  placeholder="Enter your Address"
                />
                {errors.streetAddress && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.streetAddress.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  City
                </label>
                <input
                  {...register("city", { required: "City is required" })}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-transparent text-white focus:outline-none focus:border-teal-500"
                  placeholder="Enter your city name"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Special Instructions (Optional)
                </label>
                <textarea
                  {...register("additionalInfo")}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-transparent text-white focus:outline-none focus:border-teal-500 resize-none"
                  placeholder="Any instructions..."
                />
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <section className="bg-emerald-950/20 border border-emerald-600 rounded-xl p-6 shadow-md sticky top-4">
            <div className="flex items-center mb-6">
              <Package className="w-5 h-5 text-emerald-500 mr-2" />
              <h2 className="text-xl font-semibold text-white">
                Order Summary
              </h2>
            </div>
            <div className="space-y-4 mb-6">
              {orderItems.map((item, index) => {
                const addonsTotal =
                  item.addons?.reduce(
                    (acc, addon) => acc + (addon.price || 0),
                    0
                  ) || 0;
                const totalForItem = (item.price + addonsTotal) * item.quantity;
                return (
                  <div
                    key={index}
                    className="flex justify-between p-4 bg-transparent rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        className="w-12 h-12 rounded-lg object-cover"
                        src={item.image}
                        alt={item.name}
                      />
                      <div>
                        <h3 className="text-sm font-medium text-white">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-300">{item.size}</p>
                        <p className="text-xs text-emerald-300">
                          {item.quantity} x {item.price} Tk
                        </p>
                        {item.addons?.map((addon, idx) => (
                          <p key={idx} className="text-xs text-primary">
                            {item.quantity} x {addon.label} {addon.price} Tk
                          </p>
                        ))}
                      </div>
                    </div>
                    <span className="font-medium text-white">
                      {totalForItem.toFixed(2)} Tk
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mb-6">
              {!appliedCoupon && (
                <>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Coupon Code
                  </label>
                  {coupons[0] && (
                    <p className="text-sm text-emerald-400 mb-2">
                      USE {coupons[0].code} FOR {coupons[0].discountAmount}
                      {coupons[0].type === "percentage" ? "%" : " Tk"} OFF
                    </p>
                  )}
                </>
              )}
              <div className="flex gap-2">
                {appliedCoupon ? (
                  <p className="text-primary text-sm">
                    COUPON CODE ({appliedCoupon.code}) APPLIED:{" "}
                    {appliedCoupon.discount.toFixed(2)} TK OFF
                  </p>
                ) : (
                  <>
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-600 rounded-lg bg-transparent text-white focus:outline-none focus:border-teal-500"
                      placeholder="Enter Coupon Code"
                    />
                    <button
                      onClick={handleCouponApply}
                      disabled={couponLoading}
                      className="cursor-pointer px-4 py-2 bg-emerald-950 border border-emerald-700 text-white rounded-lg hover:bg-emerald-900 disabled:opacity-50 flex items-center gap-2"
                    >
                      <Tag className="w-4 h-4" />{" "}
                      {couponLoading ? "Applying..." : "Apply"}
                    </button>
                  </>
                )}
              </div>
              <p className="text-red-500 font-inter text-sm my-1.5">
                {showError}
              </p>
            </div>

            <div className="border-t border-gray-600 pt-4 space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} Tk</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Discount</span>
                <span>-{discount.toFixed(2)} Tk</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "FREE" : `${shipping.toFixed(2)} Tk`}
                </span>
              </div>
              {shipping === 0 && (
                <p className="text-xs text-primary flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" /> Free shipping on
                  total over 1599 Tk
                </p>
              )}
              <div className="flex justify-between text-lg font-semibold text-white">
                <span>Total</span>
                <span>{total.toFixed(2)} Tk</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">
              Payment Method
            </h2>
            <div className="space-y-3">
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  selectedPayment === "cash"
                    ? "border-emerald-200 bg-teal-900"
                    : "border-gray-600 hover:border-teal-500"
                }`}
                onClick={() => setSelectedPayment("cash")}
              >
                <input
                  type="radio"
                  value="cash"
                  checked={selectedPayment === "cash"}
                  onChange={() => setSelectedPayment("cash")}
                  className="hidden"
                />
                <div className="flex items-center w-full">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                    <TbCurrencyTaka className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-medium text-white">Cash on Delivery</h3>
                    <p className="text-xs text-gray-300">
                      Pay when order arrives
                    </p>
                  </div>
                </div>
              </label>
              <label
                className="flex items-center p-4 border border-gray-600 rounded-lg opacity-50 cursor-not-allowed"
                onClick={() => setSelectedPayment("credit")}
              >
                <input
                  type="radio"
                  value="credit"
                  checked={selectedPayment === "credit"}
                  onChange={() => setSelectedPayment("credit")}
                  className="hidden"
                  disabled
                />
                <div className="flex items-center w-full">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-medium text-white">Credit Card</h3>
                    <p className="text-xs text-gray-300">
                      Currently unavailable
                    </p>
                  </div>
                </div>
              </label>
            </div>

            <button
              type="button"
              disabled={isSubmitting || placingOrder || orderLoading}
              onClick={handleSubmit(handleOrder)}
              className="w-full mt-6 bg-emerald-950 border border-emerald-700 text-white font-semibold py-3 rounded-lg hover:bg-emerald-900 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {placingOrder || orderLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : null}
              {placingOrder || orderLoading
                ? "Placing Order..."
                : "Complete Order"}
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-sm text-gray-300 flex items-center justify-center">
              <Shield className="w-4 h-4 mr-2" /> SSL encrypted & secure
              checkout
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
