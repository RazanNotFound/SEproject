import { useAuth } from "../auth/AuthContext";
import LoginForm from "../components/LoginForm";
import LogoutForm from "../components/LogoutForm";

const Login = () => {
  
  const { isAuthenticated } = useAuth();

  return (
    <div className="page">
      {isAuthenticated ? <LogoutForm /> : <LoginForm />}
    </div>
  );
};

export default Login;