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
      <div className="mt-4 text-center">
        <Link to="/forget-password" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default Login;