import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import EventCard from '../events/EventCard';

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events/organizer', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user.token]);

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-white mr-4"
          >
            <span className="material-icons">arrow_back</span>
          </Link>
          <h1 className="text-xl font-semibold">My Events</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Organized Events</h2>
          <Link 
            to="/my-events/new" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <span className="material-icons mr-2">add</span>
            Create New Event
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event._id} className="relative bg-gray-800 rounded-lg p-4 shadow-lg">
              <EventCard event={event} />
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <Link
                    to={`/my-events/${event._id}/edit`}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md transition-colors flex items-center text-sm"
                  >
                    <span className="material-icons text-base mr-1">edit</span>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors flex items-center text-sm"
                  >
                    <span className="material-icons text-base mr-1">delete</span>
                    Delete
                  </button>
                </div>
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.status === 'approved' ? 'bg-green-600/30 text-green-400' :
                  event.status === 'pending' ? 'bg-yellow-600/30 text-yellow-400' : 
                  'bg-red-600/30 text-red-400'
                }`}>
                  {event.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {events.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Link 
              to="/my-events/analytics" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors flex items-center"
            >
              <span className="material-icons mr-2">analytics</span>
              View Analytics
            </Link>
          </div>
        )}
      </main>
    </div>
  );

  async function handleDelete(eventId) {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await axios.delete(`/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setEvents(events.filter(e => e._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }
};

export default MyEventsPage;