import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const EventDetailsPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
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
                const res = await axios.get(`/events/${id}`);
                setEvent(res.data.event);
                setError('');
            } catch (err) {
                console.error('Error fetching event::', err);                if (err.code === 'ERR_NETWORK') {
                    setError('Unable to connect to the server. Please make sure the backend is running on port 5000.');
                } else if (err.code === 'ECONNABORTED') {
                    setError('Server request timed out. Please try again later.');
                } else {
                    setError(err.response?.data?.msg || 'Failed to load event details..');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            // If user is not logged in, redirect to login
            navigate('/login');
            return;
        }
        
        setBookingInProgress(true);        try {
            await axios.post('/bookings', {
                eventId: id,
                ticketQuantity: Number(ticketQuantity)
            });
            setMsg('Booking confirmed! Redirecting to dashboard...');
            setError('');
            // Refresh event data to update remaining tickets
            const eventRes = await axios.get(`/events/${id}`);
            setEvent(eventRes.data.event);
            // Redirect to user dashboard after a short delay
            setTimeout(() => navigate('/dashboard/user'), 2000);
        } catch (err) {
            console.error('Booking error:', err);            if (err.code === 'ERR_NETWORK') {
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
        return (
            <div className="loading-container">
                <p>Loading event details...</p>
            </div>
        );
    }

    if (error && !event) {
        return (
            <div className="error-container">
                <h3>Error</h3>
                <p>{error}</p>
                <button onClick={() => navigate('/events')}>Back to Events</button>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="error-container">
                <p>Event not found</p>
                <button onClick={() => navigate('/events')}>Back to Events</button>
            </div>
        );
    }

    return (
        <div className="event-details-page">
            <h2>{event.title}</h2>
            <p><strong>Date:</strong> {event.date?.split('T')[0] || 'No date specified'}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Remaining Tickets:</strong> {event.remaining_tickets}</p>
            <p><strong>Price:</strong> {event.ticket_price} EGP</p>

            {user?.role === 'user' && (
                <div className="booking-form">
                    <h4>Book Tickets</h4>
                    <input
                        type="number"
                        min="1"
                        max={event.remaining_tickets}
                        value={ticketQuantity}
                        onChange={(e) => setTicketQuantity(e.target.value)}
                        disabled={bookingInProgress}
                    />
                    <button onClick={handleBooking} disabled={bookingInProgress || event.remaining_tickets < 1}>
                        {bookingInProgress ? 'Processing...' : 'Book Now'}
                    </button>
                    {msg && <p style={{ color: 'green' }}>{msg}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}

            {!user && (
                <div className="auth-prompt">
                    <p>Please <button onClick={() => navigate('/login')}>login</button> to book tickets</p>
                </div>
            )}

            <button className="back-button" onClick={() => navigate('/events')}>Back to Events</button>
        </div>
    );
};

export default EventDetailsPage;