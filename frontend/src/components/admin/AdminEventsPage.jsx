import { useEffect, useState } from "react";
import { getAllEvents, approveEvent, declineEvent } from "../../services/api";
import EventRow from "./EventRow";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getAllEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to fetch events.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleAction = async (eventId, action) => {
    try {
      if (action === "approve") {
        await approveEvent(eventId);
      } else if (action === "decline") {
        await declineEvent(eventId);
      }
      await loadEvents(); // refresh the list
    } catch (err) {
      alert("Failed to update event status.");
      console.error(err);
    }
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Admin: Manage Events</h1>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-400">No events found.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <EventRow
              key={event._id}
              event={event}
              onAction={(action) => handleAction(event._id, action)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
