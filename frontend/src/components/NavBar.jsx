import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      {/* Logo and Main Navigation */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center" aria-label="Home">
          <img src={Logo} alt="Logo" className="h-10 w-10 object-contain" />
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/eventslist" className="text-blue-500 hover:text-blue-700 transition">Explore Events</Link>
          {!user && (
            <>
              <Link to="/login" className="hover:text-blue-300 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-300 transition">Register</Link>
            </>
          )}
          {user?.role === "Organizer" && (
            <Link to="/my-events" className="hover:text-blue-300 transition">My Events</Link>
          )}
        </div>
      </div>

      {/* User Profile Link */}
      <div className="flex items-center space-x-6">
        {user && (
          <>
            <span className="hidden sm:inline text-sm text-white">Welcome, {user.name}</span>
            <Link
              to="/profile"
              className="hover:text-blue-300 transition flex items-center"
              aria-label="Profile"
            >
              <img
                src={`http://localhost:5000${user.profilePic}`}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-blue-200 shadow"
            />
            </Link>
            <button
              onClick={logout}
              className="ml-2 px-3 py-1 bg-grey-500/50 text-white rounded hover:bg-red-600 transition"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;