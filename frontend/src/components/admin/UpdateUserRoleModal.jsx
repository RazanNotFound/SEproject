// src/components/admin/UpdateUserRoleModal.jsx
import { useState } from "react";
import { updateUserRole } from "../../services/api";

export default function UpdateUserRoleModal({ user, onClose, onUpdated }) {
  const [role, setRole] = useState(user.role);

  const handleSave = async () => {
    const updated = await updateUserRole(user._id, role);
    onUpdated(updated.user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-80 text-black">
        <h2 className="text-xl font-bold mb-4">Update Role</h2>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="Standard User">Standard User</option>
          <option value="Organizer">Organizer</option>
          <option value="System Admin">System Admin</option>
        </select>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
