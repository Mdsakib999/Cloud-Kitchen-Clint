import { useAuth } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "../Components/SharedComponent/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace={true} />;
};

export default PrivateRoute;
