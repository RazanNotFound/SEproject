import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/api";
import UserRow from "./UserRow";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers).catch(err => {
      console.error("Failed to fetch users:", err);
    });
  }, []);

  const updateUserInList = (updatedUser) => {
    setUsers(prev =>
      prev.map(u => (u._id === updatedUser._id ? updatedUser : u))
    );
  };

  const removeUserFromList = (id) => {
    setUsers(prev => prev.filter(u => u._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="space-y-4">
        {users.map(user => (
          <UserRow
            key={user._id}
            user={user}
            onUpdate={updateUserInList}
            onDelete={removeUserFromList}
          />
        ))}
      </div>
    </div>
  );
}
