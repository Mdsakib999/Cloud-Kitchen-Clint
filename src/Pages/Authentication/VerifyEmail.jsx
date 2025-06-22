import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auth, useAuth } from "../../providers/AuthProvider";
import { applyActionCode } from "firebase/auth";
import axiosInstance from "../../Utils/axios";

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const hasVerifiedRef = useRef(false);
  const { user, checkEmailVerification } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const from = location.state?.from || "/";

  // ✅ Apply verification link from email
  useEffect(() => {
    const verifyEmail = async () => {
      const oobCode = searchParams.get("oobCode");
      if (!oobCode || !user || hasVerifiedRef.current) return;

      setIsLoading(true);
      try {
        await applyActionCode(auth, oobCode);
        const idToken = await user.getIdToken(true);
        await axiosInstance.post("/auth/verify-email", { idToken });
        await checkEmailVerification();

        if (!hasVerifiedRef.current) {
          hasVerifiedRef.current = true;
          toast.success(<h1 className="font-serif">Email verified!</h1>);
          navigate(from, { replace: true });
        }
      } catch (error) {
        console.error("applyActionCode error:", error.code);
        const verified = await checkEmailVerification();
        if (verified && !hasVerifiedRef.current) {
          hasVerifiedRef.current = true;
          toast.success(<h1 className="font-serif">Email verified</h1>);
          navigate(from, { replace: true });
        } else if (!verified) {
          toast.error(<h1 className="font-serif">Invalid or expired link</h1>);
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [user, searchParams, checkEmailVerification, navigate, from]);

  // ✅ Fallback polling in case user verifies manually
  useEffect(() => {
    if (!user || searchParams.get("oobCode")) return;

    const interval = setInterval(async () => {
      if (hasVerifiedRef.current) return;

      try {
        const verified = await checkEmailVerification();
        if (verified && !hasVerifiedRef.current) {
          hasVerifiedRef.current = true;
          toast.success(<h1 className="font-serif">Email verified!</h1>);
          navigate(from, { replace: true });
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user, checkEmailVerification, from, navigate, searchParams]);

  // ⏳ Cooldown countdown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#102B2A] font-serif">
      <div className="w-16 h-16 border-4 border-t-green-600 border-gray-700 rounded-full animate-spin"></div>
    </div>
  );
};

export default VerifyEmail;
