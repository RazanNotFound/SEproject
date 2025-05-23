import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import { Link } from "react-router-dom";


const BookingForm = ({ eventId, availability, eventPrice }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const handleChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const handleBooking = async () => {
        const bookingDate = new Date().toISOString();
        if (quantity < 1) {
            alert("You must select at least 1 ticket.");
            return;
    }

        if(quantity > availability) {
            alert(`Only ${availability} tickets available`);
            return;
    }
    
    try{
        const response = await axios.post(`http://localhost:5000/api/v1/bookings`, {eventId, numberOfTickets: quantity, bookingDate}, {withCredentials: true});
        alert("Booking successful!");
        navigate(`/bookings/${response.data.booking._id}`);
    }
        catch(error) {
            alert("Oh no! Booking failed T_T");
            console.error(error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">🎟️ Book Your Tickets</h2>

            <div className="mb-2"><strong>Event ID:</strong> {eventId}</div>
            <div className="mb-2"><strong>Price per Ticket:</strong> ₹{eventPrice}</div>
            <div className="mb-4"><strong>Tickets Available:</strong> {availability}</div>

            <label className="block mb-2 font-medium">Select Quantity:</label>
            <input
                type="number"
                min="1"
                max={availability}
                value={quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded mb-4"
            />

            <div className="mb-4"><strong>Total Price:</strong> ₹{quantity * eventPrice}</div>
            <div className="flex justify-center mt-4">
                <button 
                    onClick={handleBooking}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
             >
                Book Now
            </button>
            </div>
            </div>
    );
};
export default BookingForm;