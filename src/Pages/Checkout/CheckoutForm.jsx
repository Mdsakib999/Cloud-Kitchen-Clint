import { useForm } from "react-hook-form";
import { CreditCard, DollarSign } from "lucide-react";

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
      paymentMethod: "cash",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Order placed successfully!");
  };

  const orderItems = [
    { name: "vegetable Salad X 1", price: 15.99 },
    { name: "vegetable Salad X 2", price: 15.99 },
    { name: "vegetable Salad X 3", price: 15.99 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  return (
    <div className="min-h-screen pt-32 lg:pt-48 p-4 font-inknut mb-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-2xl font-bold text-center mb-8">
          Checkout
        </h1>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-5">
          {/* Billing Form */}
          <div className="order-1 lg:order-1 lg:col-span-2 p-6 rounded-lg space-y-4">
            <h2 className="text-white text-xl font-semibold mb-6 border-b border-gray-600 pb-2">
              Billing Details
            </h2>
            <div className="space-y-4">
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="First Name"
                className="w-full p-3 bg-bg-input text-white placeholder-secondary rounded"
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm">
                  {errors.firstName.message}
                </p>
              )}
              <input
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last Name"
                className="w-full p-3 bg-bg-input text-white placeholder-secondary rounded"
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm">
                  {errors.lastName.message}
                </p>
              )}
              <input
                {...register("country", {
                  required: "Country/region is required",
                })}
                placeholder="Country/region"
                className="w-full p-3 bg-bg-input text-white placeholder-secondary rounded"
              />
              {errors.country && (
                <p className="text-red-400 text-sm">{errors.country.message}</p>
              )}
              <input
                {...register("streetAddress", {
                  required: "Street address is required",
                })}
                placeholder="Street address"
                className="w-full p-3 bg-bg-input text-white placeholder-secondary rounded"
              />
              {errors.streetAddress && (
                <p className="text-red-400 text-sm">
                  {errors.streetAddress.message}
                </p>
              )}
              <input
                {...register("townCity", { required: "Town/City is required" })}
                placeholder="Town/City"
                className="w-full p-3 bg-bg-input text-white placeholder-secondary rounded"
              />
              {errors.townCity && (
                <p className="text-red-400 text-sm">
                  {errors.townCity.message}
                </p>
              )}
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                placeholder="Phone"
                className="w-full p-3 bg-bg-input text-white placeholder-secondary rounded"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm">{errors.phone.message}</p>
              )}
              <textarea
                {...register("additionalInfo")}
                placeholder="Additional Information"
                rows="3"
                className="w-full p-3 bg-bg-input text-white placeholder-secondary rounded resize-none"
              />
            </div>

            {/* Payment + Button for Mobile */}
            <div className="lg:hidden space-y-6 mt-10">
              <div>
                <h2 className="text-white text-xl font-semibold mb-6">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      value="cash"
                      className="w-4 h-4"
                    />
                    <DollarSign className="w-5 h-5 text-white" />
                    <span className="text-white">Cash On Delivery</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      value="credit"
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5 text-white" />
                    <span className="text-white">Credit Card</span>
                  </label>
                </div>
              </div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-primary hover:bg-orange-500 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Place Order</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Order Summary + Payment for Desktop */}
          <div className="order-2 lg:order-2 space-y-6">
            <div className="p-6 rounded-lg">
              <h2 className="text-white text-xl font-semibold mb-6">
                Your Order
              </h2>
              <div className="space-y-3 bg-bg-secondary p-5 rounded-3xl">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-white">
                    <span className="text-gray-300">{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-teal-600 pt-3 mt-4">
                  <div className="flex justify-between text-white mb-2">
                    <span className="text-gray-300">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white mb-2">
                    <span className="text-gray-300">VAT</span>
                    <span>${vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold text-lg border-t border-teal-600">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Desktop Only: Payment + Button */}
            <div className="hidden lg:block space-y-6">
              <div className="px-6 rounded-lg">
                <h2 className="text-white text-xl font-semibold mb-6">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      value="cash"
                      className="w-4 h-4"
                    />
                    <DollarSign className="w-5 h-5 text-white" />
                    <span className="text-white">Cash On Delivery</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      value="credit"
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5 text-white" />
                    <span className="text-white">Credit Card</span>
                  </label>
                </div>
              </div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-primary hover:bg-orange-500 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Place Order</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
