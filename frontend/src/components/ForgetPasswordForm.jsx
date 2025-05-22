import { useState } from "react";
import axios from "axios";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:5000/api/v1/forgetPassword",
        { email, newPassword }
      );
      setMessage(res.data.message || "Password updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 rounded-2xl shadow-xl px-8 py-10 max-w-md mx-auto mt-16 flex flex-col gap-5 backdrop-blur"
    >
      <h2 className="text-2xl font-extrabold text-center text-indigo-700 mb-2 drop-shadow">
        Reset Password
      </h2>
      {message && (
        <div className="text-green-700 bg-green-100 border border-green-200 rounded-lg px-4 py-2 text-center font-medium shadow-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="text-red-700 bg-red-100 border border-red-200 rounded-lg px-4 py-2 text-center font-medium shadow-sm">
          {error}
        </div>
      )}
      <input
        type="email"
        className="border-2 border-indigo-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-indigo-500 transition"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="border-2 border-indigo-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-indigo-500 transition"
        placeholder="Enter your new password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-md hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 mt-2"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default ForgetPasswordForm;