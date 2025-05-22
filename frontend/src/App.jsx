import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyEventsPage from "./components/events/MyEventsPage";
import EventForm from "./components/events/EventForm";
import EventAnalytics from "./components/events/EventAnalytics";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/api/v1/logout", {
      method: "POST",
      credentials: "include",
    });
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {!user && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
        {user?.role === "Organizer" && (
          <>
            <Link to="/my-events" className="hover:underline">My Events</Link>
            <Link to="/my-events/new" className="hover:underline">Create Event</Link>
          </>
        )}
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm">Hi, {user.name}</span>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm">Logout</button>
        </div>
      )}
    </nav>
  );
};

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Welcome{user ? `, ${user.name}` : ""}!</h2>
      <p className="mt-2">This is your event management dashboard.</p>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Event Management Routes (Organizer) */}
          <Route path="/my-events" element={<ProtectedRoute roles={["Organizer"]}><MyEventsPage /></ProtectedRoute>} />
          <Route path="/my-events/new" element={<ProtectedRoute roles={["Organizer"]}><EventForm /></ProtectedRoute>} />
          <Route path="/my-events/:id/edit" element={<ProtectedRoute roles={["Organizer"]}><EventForm /></ProtectedRoute>} />
          <Route path="/my-events/analytics" element={<ProtectedRoute roles={["Organizer"]}><EventAnalytics /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
