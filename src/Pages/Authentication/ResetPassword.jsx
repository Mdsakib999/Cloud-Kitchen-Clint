import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = searchParams.get("oobCode");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    const verifyCode = async () => {
      if (!oobCode) {
        setError("Invalid or missing reset code.");
        setIsVerifying(false);
        return;
      }
      try {
        await verifyPasswordResetCode(auth, oobCode);
        setIsVerifying(false);
      } catch (err) {
        setError("The reset link is invalid or expired.");
        setIsVerifying(false);
      }
    };
    verifyCode();
  }, [oobCode]);

  const onSubmit = async ({ newPassword }) => {
    setIsLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Password reset successfully!");
      setTimeout(() => navigate("/signin"), 3000);
    } catch (err) {
      setError("Failed to reset password. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying)
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50 font-serif text-2xl text-emerald-800">
        Verifying link...
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-200 font-serif">
      <div className="w-full max-w-md p-8 bg-emerald-900 rounded-2xl shadow-xl border border-emerald-100">
        <div className="text-center mb-6">
          <p className="text-emerald-300 text-2xl mb-2 font-inknut">
            ByteBites
          </p>
          <h2 className="text-3xl font-bold text-emerald-400">
            Reset Password
          </h2>
        </div>

        {message && (
          <p className="text-emerald-600 text-center mb-4 font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        {!message && !error && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                {...register("newPassword", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                    message:
                      "Password must be at least 6 characters, include a letter, number, and special character",
                  },
                })}
                className="w-full p-3 pr-10 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50 text-emerald-800 placeholder-emerald-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                className="w-full p-3 pr-10 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50 text-emerald-800 placeholder-emerald-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-800"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
        <p className="text-center text-emerald-200 mt-6 text-sm">
          Back to{" "}
          <a href="/signin" className="underline hover:text-emerald-100">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
