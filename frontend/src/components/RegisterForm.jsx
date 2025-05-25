import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Standard User", // Removed profilePic
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target; // Removed files destructuring
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/v1/register", formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    navigate("/login");
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-2xl font-bold mb-6 text-center">Register</div>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full p-3 my-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-3 my-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-3 my-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
          className="w-full p-3 my-2 border border-gray-300 rounded"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 my-2 border border-gray-300 rounded"
          value={formData.role} // Added value binding
        >
          <option value="Standard User">Standard User</option>
          <option value="Organizer">Organizer</option>
          {/*<option value="System Admin">System Admin</option>*/}
        </select>
        
        {/* Removed file input completely */}
        
        <button
          type="submit"
          className="w-full p-3 my-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;