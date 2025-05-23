// src/components/admin/AdminDashboard.jsx
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/events" className="bg-gray-800 p-6 rounded shadow hover:bg-gray-700 transition">
          <h2 className="text-xl font-semibold">Manage Events</h2>
          <p className="text-gray-400 mt-2">Approve, decline, and view all event listings.</p>
        </Link>
        <Link to="/admin/users" className="bg-gray-800 p-6 rounded shadow hover:bg-gray-700 transition">
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <p className="text-gray-400 mt-2">View users, update roles, and delete accounts.</p>
        </Link>
      </div>
    </div>
  );
}
