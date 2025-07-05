import { useForm } from "react-hook-form";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiMessageSquare,
  FiChevronDown,
} from "react-icons/fi";
import { SectionHeader } from "../SharedComponent/SectionHeader";
import { PhoneCall } from "lucide-react";

export const Booking = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    alert("Booking request submitted successfully!");
    reset();
  };

  const reasonOptions = [
    "General Inquiry",
    "Breakfast Reservation",
    "Lunch Reservation",
    "Dinner Reservation",
    "Private Event",
    "Catering Service",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-bg-secondary text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="space-y-8">
            <SectionHeader
              icon={PhoneCall}
              subtitle="Let's Talk"
              title="Get In Touch For Booking"
              description="Ullamcorper ullamcorper tempor vulputate primus feugibus suspendisse feugiat ac. Mauris tellus convallis laceret quam, maximus mille ut porttitor ipsum fusce tempus pulvinar primis faucibus suspendisse"
              className="text-left"
            />

            <div className="border-t border-slate-600 pt-8">
              <h2 className="text-2xl font-semibold mb-6">Available Hours</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-slate-300">
                    Breakfast: 7 AM to 10 PM
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-slate-300">Lunch: 12PM to 3 PM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-slate-300">Dinner: 7PM to 11PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-bg-tertiary backdrop-blur-sm rounded-2xl p-8">
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    type="text"
                    placeholder="First Name *"
                    className="w-full pl-10 pr-4 py-3 bg-bg-input border border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none text-white placeholder-slate-400 transition-all"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    type="text"
                    placeholder="Last Name *"
                    className="w-full pl-10 pr-4 py-3 bg-bg-input border border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none text-white placeholder-slate-400 transition-all"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email and Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="Enter Your Email *"
                    className="w-full pl-10 pr-4 py-3 bg-bg-input border border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none text-white placeholder-slate-400 transition-all"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    {...register("contactNumber", {
                      required: "Contact number is required",
                    })}
                    type="tel"
                    placeholder="Contact Number *"
                    className="w-full pl-10 pr-4 py-3 bg-bg-input border border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none text-white placeholder-slate-400 transition-all"
                  />
                  {errors.contactNumber && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Reason and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    {...register("reason", {
                      required: "Please select a reason",
                    })}
                    className="w-full pl-4 pr-10 py-3 bg-bg-input border border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none text-white appearance-none cursor-pointer transition-all"
                  >
                    <option value="">Reason For Contacting</option>
                    {reasonOptions.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="bg-slate-700"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiChevronDown className="h-5 w-5 text-slate-400" />
                  </div>
                  {errors.reason && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.reason.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    {...register("location")}
                    type="text"
                    placeholder="Your Location"
                    className="w-full pl-10 pr-4 py-3 bg-bg-input border border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none text-white placeholder-slate-400 transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FiMessageSquare className="h-5 w-5 text-slate-400" />
                </div>
                <textarea
                  {...register("message")}
                  placeholder="Write Your Message"
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 bg-bg-input border border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none text-white placeholder-slate-400 resize-none transition-all"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  {...register("terms", {
                    required: "You must agree to the terms",
                  })}
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 text-orange-400 bg-slate-600 border-slate-500 rounded focus:ring-orange-400 focus:ring-2"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-slate-300 cursor-pointer"
                >
                  I Agree To Terms & Condition
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-400 -mt-2">
                  {errors.terms.message}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-primary hover:bg-orange-500  text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
