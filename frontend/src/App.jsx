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
import Logo from "./assets/logo.png"; // Adjust the path as necessary

function NavBar() {
  const { user } = useAuth();
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={Logo} alt="Logo" className="h-24 w-24 object-contain" />
      </Link>

      {/* Profile Button */}
      <Link
        to={user ? "/profile" : "/login"}
      >
        {user ? user.name : "Profile"}
      </Link>
    </nav>
  );
}
function HomeOrStart() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? <Home /> : <Start />;
}

function App() {

  return (
    <AuthProvider>
      <Router>
        <NavBar /> {/* Extracted navigation to its own component */}
        <Routes>
        <Route path="/" element={<HomeOrStart />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-profile" element={<UpdateProfileForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;