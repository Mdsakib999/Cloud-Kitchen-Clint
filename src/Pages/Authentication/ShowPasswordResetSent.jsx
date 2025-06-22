import { Link, useLocation } from "react-router-dom";
import { Mail } from "lucide-react";
import { useAuth } from "../../providers/AuthProvider";

const ShowPasswordResetSent = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const email = location.state?.email || user?.email;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="w-16 h-16 border-4 border-t-emerald-600 border-emerald-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50 font-serif">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-emerald-700 mb-4">
            No user found
          </h1>
          <Link to="/signin" className="text-emerald-600 hover:underline">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-200  font-serif py-12 px-4">
      <div className="w-full max-w-md bg-emerald-900 p-8 space-y-6 rounded-2xl backdrop-blur-2xl shadow-xl border border-emerald-100">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
            <Mail className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
            Password Reset Email Sent
          </h1>
          <p className="mt-2 text-sm text-emerald-200">
            We sent a password reset email to:
          </p>
          <p className="text-emerald-300 font-medium break-all">{email}</p>
        </div>

        <div className="text-center text-sm text-emerald-100">
          Check your inbox or spam folder and click the reset link to continue.
        </div>
      </div>
    </div>
  );
};

export default ShowPasswordResetSent;
