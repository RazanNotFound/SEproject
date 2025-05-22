import { useAuth } from "../auth/AuthContext";
import LoginForm from "../components/LoginForm";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page">
      <LoginForm />
    </div>
  );
};

export default Login;