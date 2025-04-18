const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authenticationMiddleware = require("../middlewares/authMiddleware");
const authorizationMiddleware = require("../middlewares/authorizationMiddleware");

// PUBLIC ROUTES
router.post("/register", userController.register);          // /api/v1/register
router.post("/login", userController.login);                // /api/v1/login
router.put("/forgetPassword", userController.forgetPassword); // /api/v1/forgetPassword

// PROTECTED ROUTES — require authentication
router.use(authenticationMiddleware);

// ADMIN ROUTES
router.get("/users", authorizationMiddleware(["Admin"]), userController.getAllUsers);          // /api/v1/users
router.get("/users/:id", authorizationMiddleware(["Admin"]), userController.getUser);          // /api/v1/users/:id
router.put("/users/:id", authorizationMiddleware(["Admin"]), userController.updateUserRole);   // /api/v1/users/:id
router.delete("/users/:id", authorizationMiddleware(["Admin"]), userController.deleteUser);    // /api/v1/users/:id

// AUTHENTICATED USER ROUTES
router.get("/users/profile", userController.getCurrentUser);          // /api/v1/users/profile
router.put("/users/profile", userController.updateCurrentUserProfile);// /api/v1/users/profile

module.exports = router;
