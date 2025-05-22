import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutForm from "./LogoutForm"; 
const ProfileForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/users/profile", { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};
 
  const handleUpload = async () => {
      if (!selectedFile) {
    alert("Please select a file first!");
    return;
  }
  console.log("Uploading file:", selectedFile);
    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const res = await axios.put(
        "http://localhost:5000/api/v1/users/profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUser((prev) => ({ ...prev, profilePic: res.data.profilePic }));
    } catch (error) {
      alert("Upload failed");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!user) return <div className="text-center py-8">Please log in to view your profile</div>;
    
  if (user.role === "System Admin") {
        return <div className="text-center py-8">You are logged in as a System Admin</div>;
    }

  return (
  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
      <div className="flex justify-center mt-4">
        {user.profilePic ? (
          <img
            src={`http://localhost:5000${user.profilePic}`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
          />
        ) : (
          <span className="text-gray-500">No profile picture</span>
        )}
      </div>
    </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <span className="w-1/3 font-medium text-gray-700">Name:</span>
          <span className="w-2/3 text-gray-900">{user.name || 'Not provided'}</span>
        </div>

        <div className="flex items-center">
          <span className="w-1/3 font-medium text-gray-700">Email:</span>
          <span className="w-2/3 text-gray-900">{user.email}</span>
        </div>
        <div className="flex items-center">
          <span className="w-1/3 font-medium text-gray-700">Role:</span>
          <span className="w-2/3 text-gray-900">{user.role}</span>
        </div>


        <div className="flex items-center">
          <span className="w-1/3 font-medium text-gray-700">Member Since:</span>
          <span className="w-2/3 text-gray-900">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center">
          <span className="w-1/3 font-medium text-gray-700">Last Updated:</span>
          <span className="w-2/3 text-gray-900">
            {new Date(user.updatedAt).toLocaleDateString()}
          </span>
        </div>
        
    <div className="flex items-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/update-profile")}
      >
        Edit
      </button>
    </div>

        <div className="flex items-center justify-center mt-6">
          <LogoutForm />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
