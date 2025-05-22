import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoutes";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Start from "./pages/Start";
import ProfileForm from "./components/ProfileForm";
import UpdateProfileForm from "./components/UpdateProfileForm";
import Home from "./pages/Home";
import ForgetPassword from "./pages/ForgetPassword";

import Logo from "./assets/logo.png";
import MyEventsPage from "./components/events/MyEventsPage";
import EventForm from "./components/events/EventForm";
import EventAnalytics from "./components/events/EventAnalytics";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white shadow">
      {/* Logo and Main Navigation */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-10 object-contain" />
        </Link>

        <div className="hidden md:flex space-x-6">
          {!user && (
            <>
              <Link to="/login" className="hover:text-blue-300 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-300 transition">Register</Link>
            </>
          )}
          {user?.role === "Organizer" && (
            <>
              <Link to="/my-events" className="hover:text-blue-300 transition">My Events</Link>
            </>
          )}
        </div>
      </div>

      {/* User Profile Link */}
      <div className="flex items-center space-x-6">
        {user && (
          <>
            <span className="hidden sm:inline text-sm">Welcome, {user.name}</span>
            <Link
              to="/profile"
              className="hover:text-blue-300 transition flex items-center"
            >
              <span className="material-icons mr-1">account_circle</span>
              Profile
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

function HomeOrStart() {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center p-8">Loading...</div>;
  return user ? <Home /> : <Start />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomeOrStart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />

            {/* Protected Routes (wrapped style) */}
            <Route path="/profile" element={<ProtectedRoute><ProfileForm /></ProtectedRoute>} />
            <Route path="/update-profile" element={<ProtectedRoute><UpdateProfileForm /></ProtectedRoute>} />

            {/* Organizer-only Routes */}
            <Route path="/my-events" element={<ProtectedRoute roles={["Organizer"]}><MyEventsPage /></ProtectedRoute>} />
            <Route path="/my-events/new" element={<ProtectedRoute roles={["Organizer"]}><EventForm /></ProtectedRoute>} />
            <Route path="/my-events/:id/edit" element={<ProtectedRoute roles={["Organizer"]}><EventForm /></ProtectedRoute>} />
            <Route path="/my-events/analytics" element={<ProtectedRoute roles={["Organizer"]}><EventAnalytics /></ProtectedRoute>} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
