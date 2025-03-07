const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, lowerCase: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true, lowerCase: true },
    image: { type: String },
    ticketPrice: { type: Number, required: true },
    totalTickets: { type: Number, required: true },
    remainingTickets: { type: Number, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    timeStamp : true,
});

const Event = mongoose.model("Event", eventSchema);