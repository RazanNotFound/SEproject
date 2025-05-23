const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, lowercase: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true, lowercase: true },
    image: { type: String },
    ticketPrice: { type: Number, required: true },
    totalTickets: { type: Number, required: true },
    remainingTickets: { type: Number, default: function() { return this.totalTickets; } },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' }
}, {
    timestamps: true 
});

// Check if model already exists to avoid re-compiling
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

module.exports = Event;
