import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { getMyEvents, deleteEvent } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyEvents().then(setEvents).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    await deleteEvent(id);
    setEvents(events.filter(e => e._id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/my-events/new")}
      >
        Create New Event
      </button>

      <div className="grid md:grid-cols-2 gap-4">
        {events.map(event => (
          <div key={event._id} className="relative border p-4 rounded shadow">
            <EventCard event={event} />
            <div className="mt-2 flex gap-2">
              <button onClick={() => navigate(`/my-events/${event._id}/edit`)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(event._id)} className="text-red-600">Delete</button>
              <button onClick={() => navigate(`/my-events/analytics?eventId=${event._id}`)} className="text-green-600">Analytics</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
