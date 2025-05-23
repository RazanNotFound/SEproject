import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "../components/BookTicketForm";
import Spinner from "../components/Spinner";

const BookTicket = () => {
    const { id: eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/events/${eventId}`, {withCredentials: true});
                console.log("Fetched event data:", response.data);
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
                setError("Could not fetch event details (•́ ᴖ •̀): " + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleBooking = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/bookings', { withCredentials: true });
        alert('Booking successful!');
        console.log('Booking response:', response.data);
    } catch (error) {
        console.error('Booking error:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'Booking failed');
    }
};

    if (loading) return <Spinner />;
    if (error) return <div>{error}</div>;
    if (!event) return <div>Event not found.</div>;

    return (
         <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Book Tickets for {event.title}
            </h1>

            <BookingForm
                eventId={event._id}
                availability={event.remainingTickets}
                eventPrice={event.ticketPrice}
            />
        </div>
    );
};

export default BookTicket;