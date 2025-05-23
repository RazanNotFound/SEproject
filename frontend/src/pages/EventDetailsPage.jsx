import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const EventDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/events/${id}`, {
          withCredentials: true,
        });
        setEvent(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching event:', err);
        if (err.code === 'ERR_NETWORK') {
          setError('Unable to connect to the server. Please make sure the backend is running on port 5000.');
        } else if (err.code === 'ECONNABORTED') {
          setError('Server request timed out. Please try again later.');
        } else {
          setError(err.response?.data?.msg || 'Failed to load event details.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBookingInProgress(true);
    try {
      await axios.post(
        'http://localhost:5000/api/v1/bookings',
        {
          eventId: id,
          ticketQuantity: Number(ticketQuantity),
        },
        { withCredentials: true }
      );

      setMsg('Booking confirmed! Redirecting to dashboard...');
      setError('');
      const eventRes = await axios.get(`http://localhost:5000/api/v1/events/${id}`);
      setEvent(eventRes.data);
      setTimeout(() => navigate('/dashboard/user'), 2000);
    } catch (err) {
      console.error('Booking error:', err);
      if (err.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please make sure the backend is running on port 5000.');
      } else if (err.code === 'ECONNABORTED') {
        setError('Server request timed out. Please try again later.');
      } else {
        setError(err.response?.data?.msg || 'Booking failed. Please try again.');
      }
    } finally {
      setBookingInProgress(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading event details...</div>;
  }

  if (error && !event) {
    return (
      <div className="p-6 text-center text-red-600">
        <h3 className="text-xl font-semibold mb-2">Error</h3>
        <p className="mb-4">{error}</p>
        <button
          onClick={() => navigate('/eventslist')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Events
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>Event not found.</p>
        <button
          onClick={() => navigate('/eventslist')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>Date:</strong> {event.date?.split('T')[0] || 'No date specified'}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Remaining Tickets:</strong> {event.remainingTickets}</p>
        <p><strong>Price:</strong> {event.ticketPrice} EGP</p>
      </div>

      {user?.role === 'user' && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h4 className="text-xl font-semibold mb-2">Book Tickets</h4>
          <input
            type="number"
            min="1"
            max={event.remainingTickets}
            value={ticketQuantity}
            onChange={(e) => setTicketQuantity(e.target.value)}
            disabled={bookingInProgress}
            className="p-2 border rounded w-24 mr-4"
          />
          <button
            onClick={handleBooking}
            disabled={bookingInProgress || event.remainingTickets < 1}
            className={`px-4 py-2 rounded text-white ${
              bookingInProgress || event.remainingTickets < 1
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {bookingInProgress ? 'Processing...' : 'Book Now'}
          </button>
          {msg && <p className="mt-2 text-green-600">{msg}</p>}
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
      )}

      {!user && (
        <div className="mt-6 text-blue-600">
          <p>
            Please{' '}
            <button onClick={() => navigate('/login')} className="underline font-semibold">
              login
            </button>{' '}
            to book tickets.
          </p>
        </div>
      )}

      <button
        onClick={() => navigate('/eventslist')}
        className="mt-8 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Events
      </button>
    </div>
  );
};

export default EventDetailsPage;
