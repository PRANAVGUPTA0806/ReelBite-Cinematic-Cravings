const express = require('express');
const { addToCart, removeFromCart, getCart, clearCart,addToCart1, removeFromCart1, getCart1, clearCart1 }= require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware'); // Ensure correct import
const router = express.Router();

// Route to get cart details (logged-in users only)
router.get('/', protect,getCart);

// Route to add an item to the cart (logged-in users only)
router.post('/add',protect, addToCart);

// Route to remove an item from the cart (logged-in users only)
router.post('/remove',protect, removeFromCart);

// Route to clear the cart (logged-in users only)
router.delete('/clear',protect, clearCart);

// Route to get cart details (logged-in users only)
router.get('/food', getCart1);

// Route to add an item to the cart (logged-in users only)
router.post('/add1',protect, addToCart1);

// Route to remove an item from the cart (logged-in users only)
router.post('/remove1', protect, removeFromCart1);

// Route to clear the cart (logged-in users only)
router.delete('/clear1', protect, clearCart1);

module.exports = router;
