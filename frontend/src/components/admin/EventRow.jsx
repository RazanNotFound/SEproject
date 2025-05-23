export default function EventRow({ event, onAction }) {
  return (
    <div className="p-4 border rounded bg-gray-800">
      <h2 className="text-lg font-semibold">{event.title}</h2>
      <p className="text-sm text-gray-400">Status: {event.status}</p>

      <div className="mt-2 space-x-3">
        {event.status === "pending" && (
          <>
            <button
              className="bg-green-600 px-3 py-1 rounded text-white"
              onClick={() => onAction("approve")}
            >
              Approve
            </button>
            <button
              className="bg-red-600 px-3 py-1 rounded text-white"
              onClick={() => onAction("decline")}
            >
              Decline
            </button>
          </>
        )}
      </div>
    </div>
  );
}
