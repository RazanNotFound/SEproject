import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import { getUserEvents, deleteEvent } from "../../services/api";

export default function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // loadEvents wrapped in useCallback so we can reuse it
  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const myEvents = await getUserEvents();  // expects raw array
      setEvents(myEvents);
    } catch (err) {
      console.error("Failed to load events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // initial load
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      // after deletion, re-fetch the updated list
      await loadEvents();
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  if (loading) {
    return <p className="p-4 text-gray-500">Loading your events...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/my-events/new")}
      >
        Create New Event
      </button>

      {events.length === 0 ? (
        <p className="text-gray-400">You have no events yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event._id} className="border p-4 rounded shadow bg-white">
              <EventCard event={event} />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => navigate(`/my-events/${event._id}/edit`)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/my-events/analytics?eventId=${event._id}`)}
                  className="text-green-600 hover:text-green-800"
                >
                  Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
