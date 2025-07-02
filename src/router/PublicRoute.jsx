import { useAuth } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "../Components/SharedComponent/Loader";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
