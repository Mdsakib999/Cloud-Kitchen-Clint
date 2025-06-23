import { useForm } from "react-hook-form";
import {
  CreditCard,
  DollarSign,
  Tag,
  Shield,
  Truck,
  CheckCircle,
  Package,
  ArrowRight,
} from "lucide-react";

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      streetAddress: "",
      townCity: "",
      phone: "",
      additionalInfo: "",
      couponCode: "",
      paymentMethod: "cash",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Order placed successfully!");
  };

  const orderItems = [
    { name: "Fresh Vegetable Salad", price: 15.99, quantity: 1, image: "🥗" },
    { name: "Garden Mix Salad", price: 18.99, quantity: 1, image: "🥙" },
    { name: "Mediterranean Bowl", price: 22.99, quantity: 1, image: "🍲" },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-bg-primary py-12 px-4 lg:pt-36">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            {/* Contact Information */}
            <div className="bg-bg-secondary rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  Contact Information
                </h2>
                <div className="flex items-center text-sm text-white">
                  <Shield className="w-4 h-4 mr-1" />
                  Secure checkout
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    First Name
                  </label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full px-4 py-3 border-2 border-bg-tertiary placeholder-white text-white rounded-2xl focus:border-primary focus:outline-none transition-colors bg-bg-input focus:bg-bg-secondary"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Last Name
                  </label>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full px-4 py-3 border-2 border-bg-tertiary placeholder-white text-white rounded-2xl focus:border-primary focus:outline-none transition-colors bg-bg-input focus:bg-bg-secondary"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    className="w-full px-4 py-3 border-2 border-bg-tertiary placeholder-white text-white rounded-2xl focus:border-primary focus:outline-none transition-colors bg-bg-input focus:bg-bg-secondary"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Country
                  </label>
                  <input
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="w-full px-4 py-3 border-2 border-bg-tertiary placeholder-white text-white rounded-2xl focus:border-primary focus:outline-none transition-colors bg-bg-input focus:bg-bg-secondary"
                    placeholder="United States"
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-bg-secondary rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="flex items-center mb-8">
                <Truck className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-white">
                  Shipping Address
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Street Address
                  </label>
                  <input
                    {...register("streetAddress", {
                      required: "Street address is required",
                    })}
                    className="w-full px-4 py-3 border-2 border-bg-tertiary placeholder-white text-white rounded-2xl focus:border-primary focus:outline-none transition-colors bg-bg-input focus:bg-bg-secondary"
                    placeholder="123 Main Street, Apt 4B"
                  />
                  {errors.streetAddress && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.streetAddress.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    City
                  </label>
                  <input
                    {...register("townCity", { required: "City is required" })}
                    className="w-full px-4 py-3 border-2 border-bg-tertiary placeholder-white text-white rounded-2xl focus:border-primary focus:outline-none transition-colors bg-bg-input focus:bg-bg-secondary"
                    placeholder="New York"
                  />
                  {errors.townCity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.townCity.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    {...register("additionalInfo")}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-bg-tertiary placeholder-white text-white rounded-2xl focus:border-primary focus:outline-none transition-colors bg-bg-input focus:bg-bg-secondary resize-none"
                    placeholder="Leave at door, ring doorbell, etc."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-bg-secondary rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-8">
              <div className="flex items-center mb-8">
                <Package className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>
              </div>

              {/* Items */}
              <div className="space-y-4 mb-8">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-bg-input rounded-2xl"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-bg-secondary rounded-xl flex items-center justify-center text-2xl mr-4 shadow-sm">
                        {item.image}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">
                          {item.name}
                        </h3>
                        <p className="text-white text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-white mb-3">
                  Promo Code
                </label>
                <div className="flex gap-3">
                  <input
                    {...register("couponCode")}
                    className="flex-1 px-4 py-3 border-2 border-bg-tertiary placeholder-white text-white rounded-2xl focus:border-primary focus:outline-none transition-colors bg-bg-input focus:bg-bg-secondary"
                    placeholder="Enter code"
                  />
                  <button
                    type="button"
                    className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4" />
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-bg-tertiary placeholder-white text-white pt-6 space-y-4">
                <div className="flex justify-between text-white">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Free shipping on orders over $50
                  </div>
                )}
                <div className="border-t border-bg-tertiary placeholder-white pt-4 flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              {/* Payment Method */}
              <h2 className="text-2xl font-bold text-white my-8">
                Payment Method
              </h2>

              <div className="space-y-4">
                <label className="relative flex items-center p-6 border-2 border-bg-tertiary placeholder-white text-white rounded-2xl cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    value="cash"
                    className="sr-only"
                  />
                  <div className="flex items-center w-full">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-white">
                        Pay when your order arrives
                      </p>
                    </div>
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-blue-600 rounded-full opacity-0 peer-checked:opacity-100"></div>
                    </div>
                  </div>
                </label>

                <label className="relative flex items-center p-6 border-2 border-bg-tertiary placeholder-white text-white rounded-2xl cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    value="credit"
                    className="sr-only"
                  />
                  <div className="flex items-center w-full">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Credit Card</h3>
                      <p className="text-sm text-white">
                        Visa, Mastercard, American Express
                      </p>
                    </div>
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-blue-600 rounded-full opacity-0 peer-checked:opacity-100"></div>
                    </div>
                  </div>
                </label>
              </div>
              {/* Place Order Button */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg">
                  {isSubmitting ? "Processing..." : "Complete Order"}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Security Note */}
              <div className="mt-6 flex items-center justify-center text-sm text-white">
                <Shield className="w-4 h-4 mr-2" />
                SSL encrypted & secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
