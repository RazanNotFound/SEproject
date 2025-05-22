const userModel = require("../models/User");
const bookingModel = require("../models/Booking");
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
      console.error("Register error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  },

  //  /api/v1/login (public)
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) return res.status(404).json({ message: "Email not found" });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(405).json({ message: "Incorrect password" });

      const token = jwt.sign(
        { user: { userId: user._id, role: user.role } },
        secretKey,
        { expiresIn: "3h" }
      );

      user.password = undefined;
      
      console.log("Generated token:", token);

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true, // remove if testing locally without https
          sameSite: "none",
        })
        .status(200)
        .json({ message: "Login successful", user });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  },

logout: async (req, res) => {
  try {
    // Clear the HTTP-only cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Required for HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/" // Important for cookie clearance
    });

    res.status(200).json({ 
      success: true,
      message: "Logged out successfully" 
    });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Server error during logout" 
    });
  }
},

  ///api/v1/forgetPassword  Update user password (Public)
  forgetPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;

      if (!newPassword) {
        return res.status(400).json({ message: "New password is required" });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Forget password error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  },

  //  /api/v1/users (Admin only)
  getAllUsers: async (req, res) => {
    try {
      if (req.user.role !== "System Admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const users = await userModel.find();
      return res.status(200).json(users);
    } catch (e) {
      console.error("Get all users error:", e.message);
      return res.status(500).json({ message: "Server error" });
    }
  },

  //  /api/v1/users/profile (GET)
  getCurrentUser: async (req, res) => {
    try {
      // Ensure that req.user.userId is a valid ObjectId
      console.log("Fetching user with ID:", req.user.userId);
  
      const user = await userModel.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (e) {
      console.error("Get current user error:", e.message);
      res.status(500).json({ message: "Server error" });
    }
  },
  

  //  /api/v1/users/profile (PUT)
updateCurrentUserProfile: async (req, res) => {
  try {
    const userId = req.user.userId;
    const allowedFields = ["name", "email"];
    const updates = {};

    // Handle text fields
    allowedFields.forEach(field => {
      if (req.body[field]) updates[field] = req.body[field];
    });

    // Handle profilePic file upload
    if (req.file) {
      // Save the file path or URL (adjust as needed for your setup)
      updates.profilePic = `/uploads/${req.file.filename}`;
    } else if (req.body.profilePic) {
      // If profilePic is sent as a string (e.g., a URL), allow that too
      updates.profilePic = req.body.profilePic;
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updates, { new: true });
    return res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
},

  //  /api/v1/users/:id (GET) — Admin
  getUser: async (req, res) => {
    try {
      if (req.user.role !== "System Admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const user = await userModel.findById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      console.error("Get user by ID error:", error.message);
      return res.status(500).json({ message: "Server error" });
    }
  },

  //  /api/v1/users/:id (PUT) — Update user role (Admin)
  updateUserRole: async (req, res) => {
    try {
      if (req.user.role !== "System Admin") {
        return res.status(403).json({ message: "Access denied" });
      }
  
      const { role } = req.body;
      const allowedRoles = ["System Admin", "Organizer", "Standard User"];
  
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
  
      if (req.params.id === req.user.userId && role !== req.user.role) {
        return res.status(400).json({ message: "Cannot change your own role" });
      }
  
      const user = await userModel.findByIdAndUpdate(req.params.id, { role }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ message: "User role updated", user });
    } catch (error) {
      console.error("Update user role error:", error.message);
      return res.status(500).json({ message: "Server error" });
    }
  },
  

  //  /api/v1/users/:id (DELETE) — Admin
  deleteUser: async (req, res) => {
    try {
      if (req.user.role !== "System Admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const user = await userModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "User deleted", user });
    } catch (error) {
      console.error("Delete user error:", error.message);
      return res.status(500).json({ message: "Server error" });
    }
  },

  //  /api/v1/users/bookings (Standard User)
  getUserBookings: async (req, res) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized: No user found in request" });
      }
  
      const bookings = await bookingModel
        .find({ user: userId })
        .populate("event");
  
      if (!bookings.length) {
        return res.status(404).json({ message: "No bookings found" });
      }
  
      return res.status(200).json({ bookings });
    } catch (error) {
      console.error("Get user bookings error:", error.message);
      return res.status(500).json({ message: "Server error" });
    }
  },
  

  //  /api/v1/users/events (Event Organizer)
  getUserEvents: async (req, res) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized: No user found in request" });
      }
  
      const events = await eventModel.find({ organizer: userId });
  
      if (!events.length) {
        return res.status(404).json({ message: "No events found for this user" });
      }
  
      return res.status(200).json({ events });
    } catch (error) {
      console.error("Get user events error:", error.message);
      return res.status(500).json({ message: "Server error" });
    }
  }
  ,

  //  /api/v1/users/events/analytics (Event Organizer)
  getEventAnalytics: async (req, res) => {
    try {
      const events = await eventModel.find({ organizer: req.user.userId });

      const analytics = {
        totalEvents: events.length,
        totalTickets: events.reduce((sum, e) => sum + (e.ticketsSold || 0), 0),
      };

      return res.status(200).json(analytics);
    } catch (error) {
      console.error("Get event analytics error:", error.message);
      return res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = userController;
