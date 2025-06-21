import Loading from "../utils/Loading";
import { useAuth } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  console.log("admin route=>", isAdmin);
  const location = useLocation();

  if (loading) return <Loading />;

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
