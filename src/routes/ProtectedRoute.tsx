import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

const ProtectedRoute = () => {

  const token = localStorage.getItem('token');

  const auth = useAuth();
  console.log(auth.isAuthenticated);

  return token ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
