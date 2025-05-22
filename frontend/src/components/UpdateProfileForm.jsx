import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import axios from "axios";

const UpdateProfileForm = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const formData = new FormData();
      if (name) formData.append("name", name);
      if (email) formData.append("email", email);
      if (password) formData.append("password", password);
      if (selectedFile) formData.append("profilePic", selectedFile);

      const res = await axios.put(
        "http://localhost:5000/api/v1/users/profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Profile updated!");
      setUser(res.data.user);
      // Optionally clear fields after update
      setName("");
      setEmail("");
      setPassword("");
      setSelectedFile(null);
    } catch (error) {
      setMessage("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block font-medium">Name</label>
        <input
          className="border rounded px-2 py-1 w-full"
          placeholder={user?.name || "Current name"}
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium">Email</label>
        <input
          className="border rounded px-2 py-1 w-full"
          type="email"
          placeholder={user?.email || "Current email"}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium">New Password</label>
        <input
          className="border rounded px-2 py-1 w-full"
          type="password"
          placeholder="Leave blank to keep current password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {user?.profilePic && (
          <div className="mt-2">
            <img
              src={`http://localhost:5000${user.profilePic}`}
              alt="Current Profile"
              className="w-16 h-16 rounded-full"
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update"}
      </button>
      {message && <div className="mt-2 text-center">{message}</div>}
    </form>
  );
};

export default UpdateProfileForm;