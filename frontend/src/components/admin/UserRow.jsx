
const UserRow = ({ user, onUpdateRole, onDelete }) => {
  return (
    <tr className="border-t">
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2 capitalize">{user.role}</td>
      <td className="p-2 text-center">
        <button
          onClick={onUpdateRole}
          className="text-sm text-indigo-600 hover:underline mr-4"
        >
          Update Role
        </button>
        <button
          onClick={onDelete}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
// This component represents a single row in the user management table.
// It displays the user's name, email, and role, and provides buttons to update the user's role or delete the user.