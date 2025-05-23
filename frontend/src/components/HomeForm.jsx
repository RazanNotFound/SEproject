import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
{/* ...user should be logged in to access this page... */}
const HomeForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewBookings = () => {
    navigate("/bookings");
  };

  const handleViewEvents = () => {
    navigate("/eventslist");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        {user ? `Welcome, ${user.name}!` : "Welcome to Very Good Ticketing!"}
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={handleViewEvents}
          className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
        >
          Browse Events
        </button>
        <button
          onClick={handleViewBookings}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          View Current Bookings
        </button>
      </div>
    </div>
  );
};

export default HomeForm;
