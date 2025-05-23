// src/components/admin/UserRow.jsx
import { useState } from "react";
import { deleteUser } from "../../services/api";
import UpdateUserRoleModal from "./UpdateUserRoleModal";
import ConfirmationDialog from "./ConfirmationDialog";

export default function UserRow({ user, onUpdate, onDelete }) {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-gray-800 p-4 rounded flex justify-between items-center text-white">
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-300">{user.email}</p>
        <p className="text-sm text-gray-400">Role: {user.role}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
          onClick={() => setShowRoleModal(true)}
        >
          Update Role
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          onClick={() => setShowConfirm(true)}
        >
          Delete
        </button>
      </div>

      {showRoleModal && (
        <UpdateUserRoleModal
          user={user}
          onClose={() => setShowRoleModal(false)}
          onUpdated={onUpdate}
        />
      )}

      {showConfirm && (
        <ConfirmationDialog
          message={`Delete user "${user.name}"?`}
          onCancel={() => setShowConfirm(false)}
          onConfirm={async () => {
            await deleteUser(user._id);
            onDelete(user._id);
          }}
        />
      )}
    </div>
  );
}
