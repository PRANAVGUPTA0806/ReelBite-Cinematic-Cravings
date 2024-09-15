const express = require("express");
const { addToCart, getCart } = require("../controllers/cartController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // For protected routes

// Route to add an item to the cart
router.post("/", protect, addToCart);

// Route to get all cart items for the logged-in user
router.get("/", protect, getCart);

module.exports = router;
