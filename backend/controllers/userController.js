const userModel = require("../models/User");
const bookingModel = require("../Models/Booking");
const eventModel = require("../models/Event");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const userController = {
  //  /api/v1/register (public)
  register: async (req, res) => {
    try {
      const { email, password, name, role, profilePic } = req.body;
      const existingUser = await userModel.findOne({ email });
      if (existingUser) return res.status(409).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({ email, password: hashedPassword, name, role, profilePic });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  //  /api/v1/login (public)
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) return res.status(404).json({ message: "email not found" });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(405).json({ message: "incorrect password" });

      const token = jwt.sign(
        { user: { userId: user._id, role: user.role } },
        secretKey,
        { expiresIn: "3h" }
      );

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true, // remove if testing locally without https
          sameSite: "none",
        })
        .status(200)
        .json({ message: "login successful", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
  ///api/v1/forgetPassword  Update user password (Public)
  forgetPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error in forgetPassword:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  //  /api/v1/users (Admin only)
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.find();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },

  //  /api/v1/users/profile (GET)
  getCurrentUser: async (req, res) => {
    try {
      const user = await userModel.findById(req.user.userId);
      res.status(200).json(user);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  //  /api/v1/users/profile (PUT)
  updateCurrentUserProfile: async (req, res) => {
    try {
      const userId = req.user.userId;
      const updates = req.body;
      const updatedUser = await userModel.findByIdAndUpdate(userId, updates, { new: true });
      return res.status(200).json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  //  /api/v1/users/:id (GET) — Admin
  getUser: async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  //  /api/v1/users/:id (PUT) — Update user role (Admin)
  updateUserRole: async (req, res) => {
    try {
      const { role } = req.body;
      const user = await userModel.findByIdAndUpdate(req.params.id, { role }, { new: true });
      return res.status(200).json({ message: "User role updated", user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  //  /api/v1/users/:id (DELETE) — Admin
  deleteUser: async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "User deleted", user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

//   //  /api/v1/users/bookings (Standard User)
  getUserBookings: async (req, res) => {
    try {
      const bookings = await bookingModel.find({ user: req.user.userId }).populate("event");
      return res.status(200).json(bookings);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  //  /api/v1/users/events (Event Organizer)
  getUserEvents: async (req, res) => {
    try {
      const events = await eventModel.find({ organizer: req.user.userId });
      return res.status(200).json(events);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

//   //  /api/v1/users/events/analytics (Event Organizer)
  getEventAnalytics: async (req, res) => {
    try {
      const events = await eventModel.find({ organizer: req.user.userId });

      // basic example analytics
      const analytics = {
        totalEvents: events.length,
        totalTickets: events.reduce((sum, e) => sum + (e.ticketsSold || 0), 0),
      };

      return res.status(200).json(analytics);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
