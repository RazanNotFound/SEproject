const Booking = require('../models/Booking');
const Event = require('../models/Event');
const User = require('../models/User');

exports.getAllEvents = async (req, res) => {
    const events = await Event.find(); 
    res.json(events);
  };
  
  
    exports.getAllApprovedEvents = async (req, res) => {
      const events = await Event.find({ status: 'approved' });
      res.json(events);
    };
  
exports.createEvent = async (req, res) => {
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Only organizers can create events' });
  }

  try {
    const event = await Event.create({
      ...req.body,
      organizer: req.user.userId,        
      remainingTickets: req.body.totalTickets,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Create event error:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
   
    
    
    exports.getEventById = async (req, res) => {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.json(event);
    };
  
    
exports.updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  // Organizers can only edit their own events
  if (req.user.role === 'Organizer' && event.organizer.toString() !== req.user.userId.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  // Define allowed fields by role
    const allowedFields = [
    'title',
    'description',
    'date',
    'location',
    'category',
    'image',
    'ticketPrice',
    'totalTickets'
  ];
  if (req.user.role === 'System Admin') {
    allowedFields.push('status');
  }

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      event[field] = req.body[field];
    }
  });

  await event.save();
  res.json(event);
};
    
    exports.deleteEvent = async (req, res) => {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
    
      if (req.user.role === 'Organizer' && event.organizer.toString() !== req.user.userId.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    
      await event.deleteOne();
      res.json({ message: 'Event deleted' });
    };
    
    exports.eventAnalytics = async (req, res) => {
      const events = await Event.find({ organizer: req.user.userId });
      const analytics = events.map(event => ({
        title: event.title,
        bookedPercentage: 100 - (event.remainingTickets / event.totalTickets) * 100,
      }));
      res.json(analytics);
    };
