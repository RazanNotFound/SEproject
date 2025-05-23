import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserRow from "./UserRow";
import UpdateUserRoleModal from "./UpdateUserRoleModal";
import ConfirmationDialog from "./ConfirmationDialog";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token"); // or whatever key you use
    const res = await axios.get("http://localhost:5000/api/v1/users", {
  withCredentials: true,
});
    console.log("Fetched users:", res.data);
    if (Array.isArray(res.data)) {
      setUsers(res.data);
    } else if (Array.isArray(res.data.users)) {
      setUsers(res.data.users);
    } else {
      setUsers([]);
    }
  } catch (error) {
    toast.error("Failed to fetch users");
    setUsers([]);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenRoleModal = (user) => {
    setSelectedUser(user);
    setShowRoleModal(true);
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const handleUpdateRole = async (newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/v1/users/${selectedUser._id}`,
        { role: newRole },
        { withCredentials: true }
      );
      toast.success("Role updated");
      fetchUsers();
    } catch {
      toast.error("Failed to update role");
    } finally {
      setShowRoleModal(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/users/${selectedUser._id}`,
        { withCredentials: true }
      );
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setShowDeleteDialog(false);
    }
  };


return (
  <div className="admin-users-container">
    <h1 className="admin-users-title">Manage Users</h1>
    <table className="admin-users-table">
      <tbody>
        {Array.isArray(users) && users.length > 0 ? (
          users.map(user => (
            <UserRow
              key={user._id}
              user={user}
              onUpdateRole={() => handleOpenRoleModal(user)}
              onDelete={() => handleOpenDeleteDialog(user)}
            />
          ))
        ) : (
          <tr>
            <td colSpan="4" className="admin-users-empty">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>

    {showRoleModal && selectedUser && (
      <UpdateUserRoleModal
        user={selectedUser}
        onClose={() => setShowRoleModal(false)}
        onSave={handleUpdateRole}
      />
    )}

    {showDeleteDialog && selectedUser && (
      <ConfirmationDialog
        message={`Are you sure you want to delete ${selectedUser.name}?`}
        onConfirm={handleDeleteUser}
        onCancel={() => setShowDeleteDialog(false)}
      />
    )}
  </div>
);
};

export default AdminUsersPage;
