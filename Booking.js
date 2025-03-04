const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/booking');

const User = require('./User');
const Event = require('./Event');

const bookingSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);