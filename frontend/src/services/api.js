import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

//
// ─── ORGANIZER ROUTES ──────────────────────────────────────────────────────────
//

export const getUserEvents = () =>
  api.get("/users/events").then(res => res.data.events);

// Create a new event (organizer)
export const createEvent = (data) =>
  api.post("/events", data).then(res => res.data);

// Fetch one event by ID
export const getEventById = (id) =>
  api.get(`/events/${id}`).then(res => res.data);

// Update event (organizer or admin)
export const updateEvent = (id, data) =>
  api.put(`/events/${id}`, data).then(res => res.data);

// Delete an event
export const deleteEvent = (id) =>
  api.delete(`/events/${id}`).then(res => res.data);

// Get analytics for the organizer (summary)
export const getEventAnalytics = () =>
  api.get("/users/events/analytics").then(res => res.data);

//
// ─── ADMIN ROUTES ───────────────────────────────────────────────────────────────
//

// Get all events (including pending, declined, approved)
export const getAllEvents = () =>
  api.get("/events/all").then(res => res.data);

// Approve event by ID
export const approveEvent = (id) =>
  api.put(`/events/${id}`, { status: "approved" }).then(res => res.data);

// Decline event by ID
export const declineEvent = (id) =>
  api.put(`/events/${id}`, { status: "declined" }).then(res => res.data);

// Get all registered users (admin)
export const getAllUsers = () =>
  api.get("/users").then(res => res.data);

// Update a user’s role
export const updateUserRole = (id, role) =>
  api.put(`/users/${id}`, { role }).then(res => res.data);

// Delete a user
export const deleteUser = (id) =>
  api.delete(`/users/${id}`).then(res => res.data);
