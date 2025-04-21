const Booking = require('../models/Booking');
const Event = require('../models/Event');
const User = require('../models/User');

const bookingController = {
    createBooking: async (req, res) => {
        try {
          const { eventId, numberOfTickets, bookingDate } = req.body;
          const userId = req.user.userId; 
      
          const eventDetails = await Event.findById(eventId);
          if (!eventDetails) {
            return res.status(404).json({ message: 'Event not found T_T' });
          }
      
          if (eventDetails.remainingTickets < numberOfTickets) {
            return res.status(400).json({ message: 'Not enough tickets available >_<' });
          }
      
          const totalPrice = eventDetails.ticketPrice * numberOfTickets;
      
          eventDetails.remainingTickets -= numberOfTickets;
          await eventDetails.save();
      
          const newBooking = await Booking.create({
            user: userId,
            event: eventId,
            ticketsBooked: numberOfTickets,
            bookingDate,
            totalPrice,
            status: 'confirmed',
          });
      
          return res.status(201).json({ message: 'Booking created successfully!', booking: newBooking });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Oh oh, whoopsie (｡•́︿•̀｡) cannot create booking' });
        }
      },
    

    getCurrentBookings: async (req, res) => {
        try {
            const userId = req.User.id;
            const booking = await Booking.find({userId})
            return res.status(200).json({ booking });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Can not retrive (imjusagirl)' });
        }
    },

    getBookingById: async (req, res) => {
        try {
        const booking = await Booking.findById(req.params.id)
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found T_T' });
        }
        return res.status(200).json({ booking });
    }   catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Booking error (quite literally)' });
    }
},

cancelBookings: async (req, res) => {
    try {
      const ticket = await Booking.findById(req.params.id);
      
      if (!ticket) {
        return res.status(404).json({ message: 'Booking not found T_T' });
      }
  
      if (ticket.status === 'cancelled') {
        return res.status(400).json({ message: 'Booking already cancelled \^^/' });
      }
  
      const eventDetails = await Event.findById(ticket.event);
      if (!eventDetails) {
        return res.status(404).json({ message: 'Event not found O_o' });
      }
  
      eventDetails.remainingTickets += ticket.ticketsBooked; 
      await eventDetails.save();
  
      ticket.status = 'cancelled';
      await ticket.save();
  
      return res.status(200).json({ message: 'Booking cancelled successfully! Yippeee ^^', ticket });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error could not cancel booking >o<' });
    }
  }
  
}
module.exports = bookingController;
