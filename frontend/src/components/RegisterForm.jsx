import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Standard User",
    profilePic: ""
  });
  const [error, setError] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/v1/register", formData, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="profilePic" placeholder="Profile Picture URL" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="Standard User">Standard User</option>
        <option value="Organizer">Organizer</option>
        <option value="System Admin">System Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
