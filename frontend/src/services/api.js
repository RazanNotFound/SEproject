import axios from "axios";

// base axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// Public: approved events listing
export const getApprovedEvents = () =>
  api.get("/events").then(res => res.data);

// Admin only: all events
// Events (Admin)
export const getAllEvents = () =>
  api.get("/events/all").then(res => res.data);
export const approveEvent = (id) =>
  api.put(`/events/${id}`, { status: "approved" }).then(res => res.data);
export const declineEvent = (id) =>
  api.put(`/events/${id}`, { status: "declined" }).then(res => res.data);


// Organizer only: your own events (from userController.getUserEvents)
export const getMyEvents = () =>
  api.get("/users/events").then(res => res.data.events);

// Create a new event (Organizer)
export const createEvent = (data) =>
  api.post("/events", data).then(res => res.data);

// Fetch a single event
export const getEventById = (id) =>
  api.get(`/events/${id}`).then(res => res.data);

// Update an event (Organizer or Admin)
export const updateEvent = (id, data) =>
  api.put(`/events/${id}`, data).then(res => res.data);

// Delete an event (Organizer or Admin)
export const deleteEvent = (id) =>
  api.delete(`/events/${id}`).then(res => res.data);

// Organizer analytics (route: /events/organizer/analytics)
export const getEventAnalytics = (eventId) =>
  api
    .get(`/events/organizer/analytics`, { params: { eventId } })
    .then(res => res.data);

// Logout (must match your userRoutes logout path—usually `/users/logout`)
export const logout = () =>
  api.post("/users/logout").then(res => res.data);

// Users (Admin)
export const getAllUsers = () =>
  api.get("/users").then(res => res.data);
export const updateUserRole = (id, role) =>
  api.put(`/users/${id}`, { role }).then(res => res.data);
export const deleteUser = (id) =>
  api.delete(`/users/${id}`).then(res => res.data);