import { toast } from "react-hot-toast";
import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../providers/AuthProvider";
import axiosInstance from "../../Utils/axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, googleSignIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const saveUserToDB = async (userData, idToken) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", userData, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Error saving user to DB: ", error);
      toast.error(
        error?.response?.data?.message || "Failed to save user to DB"
      );
      throw error;
    }
  };

  // FROM submit
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await createUser(data.email, data.password);
      await updateProfile(result.user, { displayName: data.name });

      const idToken = await result.user.getIdToken();
      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        provider: result.user.providerData[0]?.providerId,
        uid: result.user.uid,
        role: "user",
      };

      const dbData = await saveUserToDB(userData, idToken);

      if (userData) {
        toast.success(
          <h1 className="font-serif text-center">
            Account created successfully! Please check your email for
            verification.
          </h1>
        );

        // Navigate to verify email page
        navigate("/verification-email", {
          state: {
            email: userData?.email || data?.email || dbData.email,
            from: from,
          },
        });
      }
    } catch (error) {
      console.error("Error creating user: ", error?.message);
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          <h1 className="font-serif">This email is already registered.</h1>
        );
      } else if (error.code === "auth/invalid-email") {
        toast.error(<h1 className="font-serif">Please enter a valid email</h1>);
      } else if (error.code === "auth/weak-password") {
        toast.error(
          <h1 className="font-serif">
            Password should be at least 6 characters
          </h1>
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      const idToken = await result.user.getIdToken();
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        phone: "",
        address: "",
        provider: result.user.providerData[0]?.providerId,
        uid: result.user.uid,
        role: "user",
      };

      await saveUserToDB(userData, idToken);

      toast.success(
        <h1 className="font-serif">Signed in with Google successfully!</h1>
      );

      // Google accounts are already verified, so navigate directly
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error signing in with Google: ", error?.message);
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#102B2A] font-serif py-20">
      <div className="w-full max-w-lg bg-[#0c2424] p-10 space-y-8 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01]">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 tracking-tight">
            ByteBytes
          </h1>
          <p className="mt-3 text-base text-gray-400">
            Create your account for an exciting experience
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="relative">
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <div className="flex items-center border border-gray-200 text-white rounded-full focus-within:ring-2 focus-within:ring-green-500">
              <span className="pl-4 text-gray-500">
                <User className="h-5 w-5" />
              </span>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-3 bg-transparent focus:outline-none placeholder-gray-400"
                placeholder="Full Name"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="flex items-center border border-gray-200 text-white rounded-full focus-within:ring-2 focus-within:ring-green-500">
              <span className="pl-4 text-gray-500">
                <Mail className="h-5 w-5" />
              </span>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-3 bg-transparent focus:outline-none placeholder-gray-400"
                placeholder="Email address"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="phone" className="sr-only">
              Phone Number
            </label>
            <div className="flex items-center border font-sans border-gray-200 rounded-full text-white focus-within:ring-2 focus-within:ring-green-500">
              <span className="pl-4 text-gray-500">
                <Phone className="h-5 w-5" />
              </span>
              <input
                id="phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01\d{9}$/,
                    message: "Invalid phone number format",
                  },
                })}
                className="w-full px-4 py-3 bg-transparent focus:outline-none placeholder-gray-400"
                placeholder="Phone Number"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="address" className="sr-only">
              Address
            </label>
            <div className="flex items-center border border-gray-200 text-white rounded-full focus-within:ring-2 focus-within:ring-green-500">
              <span className="pl-4 text-gray-500">
                <MapPin className="h-5 w-5" />
              </span>
              <input
                id="address"
                {...register("address", { required: "Address is required" })}
                className="w-full px-4 py-3 bg-transparent focus:outline-none placeholder-gray-400"
                placeholder="Address"
              />
            </div>
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="flex items-center border border-gray-200 text-white rounded-full focus-within:ring-2 focus-within:ring-green-500">
              <span className="pl-4 text-gray-500">
                <Lock className="h-5 w-5" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                    message:
                      "Password must be at least 6 characters long and include at least one letter, one number, and one special character",
                  },
                })}
                className="w-full px-4 py-3 bg-transparent focus:outline-none placeholder-gray-400"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-white focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-full shadow-md text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoaderCircle className="animate-spin h-5 w-5 mr-3" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-600">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full flex justify-center items-center py-3 px-4 rounded-full shadow-md bg-black text-white text-sm font-medium hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={loading}
            >
              <FcGoogle className="h-5 w-5" />
              <span className="ml-2">Sign up with Google</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-4 text-sm font-medium">
          <span className="text-white">Already have an account? </span>
          <Link
            to="/signin"
            className="text-green-600 hover:text-green-500 focus:outline-none transition-colors cursor-pointer"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
