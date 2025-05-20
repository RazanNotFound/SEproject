const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

// PUBLIC ROUTES
router.post("/register", userController.register);             // /api/v1/register
router.post("/login", userController.login);                   // /api/v1/login
router.put("/forgetPassword", userController.forgetPassword);  // /api/v1/forgetPassword
router.post('/logout', userController.logout);

// PROTECTED ROUTES — require authentication
router.use(authenticationMiddleware);

// AUTHENTICATED USER ROUTES — these must come first
router.get("/users/profile", userController.getCurrentUser);          
router.put("/users/profile", userController.updateCurrentUserProfile);

router.get("/users/bookings", authorizationMiddleware(["Standard User", "Organizer", "System Admin"]), userController.getUserBookings);
router.get("/users/events", authorizationMiddleware(["Organizer"]), userController.getUserEvents);
router.get("/users/events/analytics", authorizationMiddleware(["Organizer"]), userController.getEventAnalytics);

// ADMIN ROUTES
router.get("/users", authorizationMiddleware(["System Admin"]), userController.getAllUsers);       
router.get("/users/:id", authorizationMiddleware(["System Admin"]), userController.getUser);       
router.put("/users/:id", authorizationMiddleware(["System Admin"]), userController.updateUserRole);
router.delete("/users/:id", authorizationMiddleware(["System Admin"]), userController.deleteUser); 


// missing routes


module.exports = router;
