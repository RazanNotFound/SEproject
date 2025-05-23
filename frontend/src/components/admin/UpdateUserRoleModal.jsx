import { useState } from "react";

const UpdateUserRoleModal = ({ user, onClose, onSave }) => {
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    if (role !== user.role) {
      onSave(role);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Role for {user.name}</h2>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="Standard User">Standard User</option>
          <option value="Organizer">Organizer</option>
          <option value="System Admin">System Admin</option>
        </select>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserRoleModal;
// This component is a modal for updating a user's role.
// It takes the user object, a function to close the modal, and a function to save the new role as props.