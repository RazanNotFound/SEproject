const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

// PUBLIC ROUTES
router.post("/register", userController.register);             // /api/v1/register
router.post("/login", userController.login);                   // /api/v1/login
router.put("/forgetPassword", userController.forgetPassword);  // /api/v1/forgetPassword

// PROTECTED ROUTES — require authentication
router.use(authenticationMiddleware);

// ADMIN ROUTES
router.get("/users", authorizationMiddleware(["Admin"]), userController.getAllUsers);       
router.get("/users/:id", authorizationMiddleware(["Admin"]), userController.getUser);       
router.put("/users/:id", authorizationMiddleware(["Admin"]), userController.updateUserRole);
router.delete("/users/:id", authorizationMiddleware(["Admin"]), userController.deleteUser); 

// AUTHENTICATED USER ROUTES
router.get("/users/profile", userController.getCurrentUser);          
router.put("/users/profile", userController.updateCurrentUserProfile);

// missing routes
router.get("/users/bookings", authorizationMiddleware(["Standard", "Organizer", "Admin"]), userController.getUserBookings);
router.get("/users/events", authorizationMiddleware(["Organizer"]), userController.getUserEvents);
router.get("/users/events/analytics", authorizationMiddleware(["Organizer"]), userController.getEventAnalytics);

module.exports = router;
