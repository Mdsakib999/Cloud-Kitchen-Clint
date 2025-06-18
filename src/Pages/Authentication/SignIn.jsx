import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../providers/AuthProvider";
import { LoaderCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "../../utils/axios";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { googleSignIn, user, forgotPassword } = useAuth(); // Removed signIn since we're using backend
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleResetPassword = async () => {
    const email = getValues("email");
    if (!email) {
      return toast.error(
        <h1 className="font-serif">Please enter your email first</h1>
      );
    }
    setIsLoading(true);
    try {
      await forgotPassword(email);
      toast.success(
        <h1 className="font-serif">Password reset email sent successfully!</h1>
      );
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(<h1 className="font-serif">Failed to send reset email</h1>);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserToDB = async (userData) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", userData);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error saving user to DB: ", error);
      toast.error(
        <h1 className="font-serif">
          {error?.response?.data?.message || "Failed to save user"}
        </h1>
      );
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Call backend /auth/login endpoint
      const response = await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Store user data and token in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      toast.success(<h1 className="font-serif">Signed in successfully!</h1>);
      navigate(from, { replace: true });
    } catch (error) {
      let errorMessage = "Failed to sign in";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data.message || "Invalid credentials";
      }
      toast.error(<h1 className="font-serif">{errorMessage}</h1>);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await googleSignIn();

      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        provider: result.user.providerData[0]?.providerId,
        uid: result.user.uid,
      };

      await saveUserToDB(userData);

      toast.success(
        <h1 className="font-serif">Signed in with Google successfully</h1>
      );
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error signing in with Google: ", error?.message);
      let errorMessage = "Failed to sign in with Google";
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Google sign-in was cancelled";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(<h1 className="font-serif">{errorMessage}</h1>);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#102B2A] font-serif pt-20">
      <div className="w-full max-w-lg p-10 bg-[#0c2424] space-y-8 rounded-2xl transform transition-all shadow shadow-green-800 mb-5">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 tracking-tight">
            ByteBytes
          </h1>
          <p className="mt-3 text-base text-gray-400">Welcome Back,</p>
          <p className="text-base text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="flex items-center border border-gray-200 bg-[#021919] text-white rounded-full focus-within:ring-2 focus-within:ring-green-500">
              <span className="pl-4 text-white">
                <Mail className="h-5 w-5" />
              </span>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 focus:outline-none placeholder-gray-400"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="flex items-center border border-gray-200 bg-[#021919] text-white rounded-full focus-within:ring-2 focus-within:ring-green-500">
              <span className="pl-4 text-white">
                <Lock className="h-5 w-5" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 bg-transparent focus:outline-none placeholder-gray-400"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
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

          {/* Forgot Password */}
          <div className="flex items-center justify-end">
            <button
              onClick={handleResetPassword}
              type="button"
              className="text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none transition-colors cursor-pointer"
            >
              Forgot your password?
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer flex justify-center py-3 px-4 rounded-full shadow-md text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoaderCircle className="animate-spin h-5 w-5 mr-3" />
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
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
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full cursor-pointer flex justify-center items-center py-3 px-4 rounded-full shadow-md bg-black text-sm font-medium text-white hover:bg-gray-50 hover:text-black duration-500 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="h-5 w-5" />
              <span className="ml-2">
                {isLoading ? "Signing In..." : "Sign in with Google"}
              </span>
            </button>
          </div>
        </div>

        <div className="text-center mt-4 text-sm font-medium">
          <span className="text-white">Don't have an account? </span>
          <Link
            to="/signup"
            className="text-green-600 hover:text-green-500 focus:outline-none transition-colors cursor-pointer"
          >
            Sign up
          </Link>
        </div>
      </div>
      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default SignIn;
