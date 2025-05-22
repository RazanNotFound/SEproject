import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const {
    _id,
    title,
    date,
    location,
    price,
    ticketCount,
    ticketsSold,
    status,
  } = event;

  const remainingTickets = ticketCount - (ticketsSold || 0);
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div
      onClick={() => navigate(`/events/${_id}`)}
      className="cursor-pointer border rounded-2xl shadow hover:shadow-lg transition duration-200 p-4 bg-white flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">📍 {location}</p>
        <p className="text-gray-600">📅 {formattedDate}</p>
        <p className="text-gray-600">🎟️ ${price}</p>
      </div>

      {status && (
        <span
          className={`inline-block mt-2 px-2 py-1 text-sm rounded-full font-medium ${
            status === "approved"
              ? "bg-green-100 text-green-700"
              : status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status.toUpperCase()}
        </span>
      )}

      {typeof remainingTickets === "number" && (
        <p
          className={`mt-2 text-sm font-medium ${
            remainingTickets === 0
              ? "text-red-600"
              : remainingTickets <= 5
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {remainingTickets === 0
            ? "Sold Out"
            : remainingTickets <= 5
            ? `Only ${remainingTickets} left`
            : `${remainingTickets} tickets available`}
        </p>
      )}
    </div>
  );
}
