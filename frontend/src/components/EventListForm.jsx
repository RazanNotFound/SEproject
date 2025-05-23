import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";

const EventListForm = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    
    useEffect (() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/events', { withCredentials: true });
                console.log("Fetched events:", response.data);
                setEvents(response.data);
            }
            catch (error) {
                setError("Error fetching events >O<: " + error.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!events || events.length === 0) return <div>No events found.</div>;

  return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(event => (
                <EventCard key={event._id} event={event} />
            ))}
        </div>
    );
};

export default EventListForm;


