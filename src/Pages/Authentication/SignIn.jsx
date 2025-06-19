import { toast } from "react-hot-toast";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "../../Utils/axios";
import { useAuth } from "../../providers/AuthProvider";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { signIn, googleSignIn, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const saveUserToDB = async (userData, idToken) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", userData, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      return data;
    } catch (error) {
      // If user already exists, that's fine for Google sign-in
      if (
        error?.response?.status === 400 &&
        error?.response?.data?.message?.includes("already exists")
      ) {
        return null; // User exists, continue with sign-in
      }
      console.error("Error saving user to DB: ", error);
      toast.error(error?.response?.data?.message || "Failed to save user");
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await signIn(data.email, data.password);

      // Verify token with backend
      const idToken = await result.user.getIdToken();
      await axiosInstance.post(
        "/auth/verify-token",
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      // Check email verification status
      if (!result.user.emailVerified) {
        toast.success(<h1 className="font-serif">Signed in successfully!</h1>);
        // Redirect to verification page for unverified email users
        navigate("/verification-email", {
          state: {
            email: data.email,
            from: from,
          },
        });
      } else {
        toast.success(<h1 className="font-serif">Signed in successfully!</h1>);
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Error signing in: ", error?.message);
      if (error.code === "auth/user-not-found") {
        toast.error(
          <h1 className="font-serif">No user found with this email</h1>
        );
      } else if (error.code === "auth/wrong-password") {
        toast.error(<h1 className="font-serif">Incorrect password</h1>);
      } else if (error.code === "auth/invalid-email") {
        toast.error(<h1 className="font-serif">Invalid email address</h1>);
      } else if (error.code === "auth/invalid-credential") {
        toast.error(<h1 className="font-serif">Invalid email or password</h1>);
      } else {
        toast.error(<h1 className="font-serif">Failed to sign in</h1>);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await googleSignIn();
      const idToken = await result.user.getIdToken();

      // Check if user exists in database, if not create them
      try {
        await axiosInstance.post(
          "/auth/verify-token",
          {},
          { headers: { Authorization: `Bearer ${idToken}` } }
        );
      } catch (error) {
        // If user doesn't exist, create them
        if (error.response?.status === 404) {
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
        } else {
          throw error;
        }
      }

      toast.success(
        <h1 className="font-serif">Signed in with Google successfully!</h1>
      );

      // Google accounts are already verified, navigate directly
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error signing in with Google: ", error?.message);
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

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
      if (error.code === "auth/user-not-found") {
        toast.error(
          <h1 className="font-serif">No user found with this email</h1>
        );
      } else {
        toast.error(<h1 className="font-serif">Failed to send reset email</h1>);
      }
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
                className="w-full px-4 py-3 bg-transparent focus:outline-none placeholder-gray-400"
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

          <div className="flex items-center justify-end">
            <button
              onClick={handleResetPassword}
              type="button"
              className="text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none transition-colors cursor-pointer"
            >
              Forgot your password?
            </button>
          </div>

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
              <span className="px-3 bg-[#0c2424] text-gray-400">
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
    </div>
  );
};

export default SignIn;
