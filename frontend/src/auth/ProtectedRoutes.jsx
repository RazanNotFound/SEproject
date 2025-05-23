import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Spinner from "../components/Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
