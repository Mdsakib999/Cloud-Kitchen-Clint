import { Link, useLocation } from "react-router-dom";
import { Mail } from "lucide-react";
import { useAuth } from "../../providers/AuthProvider";

const ShowEmailVerification = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const email = location.state?.email || user?.email;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#102B2A]">
        <div className="w-16 h-16 border-4 border-t-green-600 border-gray-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#102B2A] font-serif">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No user found</h1>
          <Link to="/signin" className="text-green-600 hover:underline">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#102B2A] font-serif py-12 px-4">
      <div className="w-full max-w-md bg-[#0c2424] p-8 space-y-6 rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
            Please Verify Your Email
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            We sent a verification email to:
          </p>
          <p className="text-white font-medium break-all">{email}</p>
        </div>

        <div className="text-center text-sm text-gray-300">
          Check your inbox or spam folder and click the verification link to
          continue.
        </div>
      </div>
    </div>
  );
};

export default ShowEmailVerification;
