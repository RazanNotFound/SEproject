// src/components/admin/ConfirmationDialog.jsx
export default function ConfirmationDialog({ message, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-80 text-black">
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}
