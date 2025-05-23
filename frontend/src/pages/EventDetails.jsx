import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import BookTicketForm from '../components/BookTicketForm';

const EventDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/events/${id}`, {
          withCredentials: true,
        });
        setEvent(response.data);
      } catch (error) {
        setError("Could not fetch event details: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (authLoading || loading) return <p>Loading event details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!event) return <p>Event not found.</p>;

  const availableTickets = event.remainingTickets ?? (event.totalTickets - (event.ticketsBooked || 0));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{event.title || event.name}</h2>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Total Tickets:</strong> {event.totalTickets}</p>
      <p><strong>Tickets Booked:</strong> {event.ticketsBooked || 0}</p>
      <p><strong>Available Tickets:</strong> {availableTickets}</p>
      <p><strong>Ticket Price:</strong> ₹{event.ticketPrice}</p>

      {user ? (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Book Your Tickets</h3>
          <BookTicketForm
            eventId={event._id}
            availability={availableTickets}
            eventPrice={event.ticketPrice}
          />
        </div>
      ) : (
        <p className="mt-4 text-blue-600">Login to book tickets.</p>
      )}
    </div>
  );
};

export default EventDetails;