import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import StartForm from "../components/StartForm";

const Start = () => {
  
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <StartForm />
    </div>
  );
};

export default Start;
