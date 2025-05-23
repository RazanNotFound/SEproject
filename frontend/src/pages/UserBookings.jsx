import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import EventCard from "../components/EventCard";
import Spinner from "../components/Spinner";

const UserBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/users/bookings`, { withCredentials: true });
                setBookings(response.data.bookings || []);
                const activeBookings = response.data.bookings.filter(b => b.status !== 'cancelled');
                setBookings(activeBookings);
            } catch (error) {
                console.error("Whoopsie could not fetch ૮(˶ㅠ︿ㅠ)ა: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    if (loading) {
        return <Spinner />;
    }

    const handleCancel = async (bookingId) => {
  try {
    await axios.delete(`http://localhost:5000/api/v1/bookings/${bookingId}`, {withCredentials: true});
    alert("Aww we're sad to see you go, successfully canceled >~<!");

    // Update the bookings state to remove the canceled booking
    setBookings((prev) => prev.filter((b) => b._id !== bookingId));
} catch (error) {
    console.error("Error canceling booking: ", error);
    alert("Oh no! Could not cancel booking.");
}
    }

    if (loading) {return <Spinner/>;}

    return (
        <div className="User-bookings">
            <h2>Your Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
    {bookings.map((booking) => (
        <li key={booking._id} className="mb-6">
            <Link to={`/bookings/${booking._id}`}>
                Booking ID: {booking._id}
            </Link>
            {/* Render the event card if event is populated */}
            {booking.event ? (
                <EventCard event={booking.event} />) : (<p>Event not found</p>)}
            <p>Tickets: {booking.ticketsBooked}</p>
            <p>Date: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}</p>
            <p>Status: {booking.status}</p>
            <p>Total Price: ₹{booking.totalPrice}</p>
            {booking.status === "confirmed" && (
                <button
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleCancel(booking._id)}
                >
                    Cancel Booking
                </button>
            )}
        </li>
    ))}
</ul>
            )}
        </div>
    );
};

export default UserBookings;