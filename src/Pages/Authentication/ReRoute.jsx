import { useSearchParams } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";

const ReRoute = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  if (mode === "verifyEmail") {
    return <VerifyEmail />;
  }

  if (mode === "resetPassword") {
    return <ResetPassword />;
  }

  return (
    <div className="font-serif min-h-screen flex items-center justify-center text-white text-2xl bg-red-600">
      Invalid or unknown action mode.
    </div>
  );
};

export default ReRoute;
