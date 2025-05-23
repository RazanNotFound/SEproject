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
import EventList from "./pages/EventList";
import BookingDetails from "./pages/BookingDetails";
import UserBookings from "./pages/UserBookings";
import MyEventsPage from "./components/events/MyEventsPage";
import EventForm from "./components/events/EventForm";
import EventAnalytics from "./components/events/EventAnalytics";
import AdminUsersPage from "./components/admin/AdminUsersPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminEventsPage from "./components/admin/AdminEventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
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
          <Link to={"/eventslist"} className="ml-4 text-blue-500">Book</Link>
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
            <Route path="/admin" element={<ProtectedRoute roles={["System Admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roles={["System Admin"]}><AdminUsersPage /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute roles={["System Admin"]}><AdminEventsPage /></ProtectedRoute>} />
              
            <Route path="/eventslist" element={<EventList />} /> {/* Works */}
            <Route path="/bookings/:id" element={<BookingDetails />} /> {/* Works */}
            <Route path="/bookings" element={<UserBookings />} /> {/* Works */}
            <Route path="/events/:id" element={<EventDetailsPage />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
