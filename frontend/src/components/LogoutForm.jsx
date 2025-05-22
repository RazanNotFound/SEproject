import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const LogoutForm = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/v1/logout", {
        method: "POST",
        credentials: "include",
      });
      logout();          // set user to null in context
      navigate("/");     // redirect to Start page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading || !user) return null;

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Log out
    </button>
  );
};

export default LogoutForm;