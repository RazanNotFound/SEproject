import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const BookingDetails = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchBookingDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/bookings/${id}`, {withCredentials: true,});
            setBooking(response.data.booking);
        } catch (error) {
            console.error("Sorry but we can not fetch the details (•́ ᴖ •̀): ", error);
        } finally {
            setLoading(false);
        }
        };
    
        fetchBookingDetails();
    }, [id, user]);
    
    if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading booking details...
        </p>
    );

  if (!booking)
    return (
      <p style={{ textAlign: "center", color: "red", marginTop: "2rem" }}>
        Booking not found.
        </p>
    );

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1.5rem",
        background: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Booking Details
      </h2>
      <p><strong>Booking ID:</strong> {booking._id}</p>
      <p><strong>Event ID:</strong> {booking.eventId || booking.event}</p>
      <p><strong>Tickets Booked:</strong> {booking.ticketsBooked}</p>
      <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <p><strong>Booking Date:</strong>{" "}
        {booking.createdAt ? new Date(booking.createdAt).toLocaleString() : "N/A"}
      </p>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Go to Homepage
        </button>
      </div>
      
    </div>
  );
};

export default BookingDetails;