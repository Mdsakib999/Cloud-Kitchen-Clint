import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

// !!! TODO: INCOMPLETE STILL !!! //
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = searchParams.get("oobCode");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Password reset successfully!");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError("Failed to reset password. Try again.");
    }
  };

  if (isVerifying)
    return (
      <div className="min-h-screen text-center flex items-center justify-center font-serif text-3xl bg-emerald-900 text-white">
        Verifying link...
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-300 font-serif">
      <div className="w-full max-w-md p-8 bg-gradient-to-r bg-emerald-700 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Reset Your Password
        </h2>

        {message && (
          <p className="text-green-600 text-center mb-4">{message}</p>
        )}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.newPassword && (
                <p className="text-red-200 text-sm mt-1">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-white cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-200 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition duration-200"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
