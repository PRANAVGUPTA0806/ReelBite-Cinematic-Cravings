// routes/userRoutes.js

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
  requestPasswordReset,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for getting the user profile
router.get("/profile", protect, getUserProfile);

// Route for updating the user profile
router.put("/profile", protect, updateUserProfile);

// Route for requesting password reset
router.post('/forgot-password', requestPasswordReset);

// Route for resetting password
router.patch('/reset-password/:resetToken', resetPassword);

module.exports = router;
