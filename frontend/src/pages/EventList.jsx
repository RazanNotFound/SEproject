import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import axios from 'axios';
import EventCard from '../components/events/EventCard';
import { useAuth } from '../auth/AuthContext';



const EventList = forwardRef((props, ref) => {
  const {user} = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const response = await axios.get('http://localhost:5000/api/v1/events', {
        withCredentials: true
      });
      
      // Check if response.data is an array or has an events property
      const eventsData = Array.isArray(response.data) ? response.data : response.data.events;
      
      if (!Array.isArray(eventsData)) {
        throw new Error('Invalid response format: events data is not an array');
      }

      // Filter only approved events
      const approvedEvents = eventsData.filter(event => event.status === 'approved');
      setEvents(approvedEvents);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.message || 'Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Expose refresh method to parent components
  useImperativeHandle(ref, () => ({
    refresh: fetchEvents
  }));

  if (loading) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="text-gray-600">Loading events...</div>
    </div>
  );

  if (error) return (
    <div className="text-red-600 bg-red-50 p-4 rounded-lg">
      {error}
    </div>
  );

  if (events.length === 0) return (
    <div className="text-gray-600 text-center p-8">
      No events available at the moment.
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
});

export default EventList;