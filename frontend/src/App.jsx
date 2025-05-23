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
import EventDetails from "./pages/EventDetails";
import Spinner from "./components/Spinner";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import DarkModeToggle from "./components/DarkModeToggle";
function HomeOrStart() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (user?.role === "System Admin") return <div><AdminUsersPage /><AdminEventsPage /></div>  ;
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
            <Route path="/events/:id" element={<EventDetails />} />
          </Routes>
        </main>
        <DarkModeToggle />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
