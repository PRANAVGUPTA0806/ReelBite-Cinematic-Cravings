const Cart = require("../models/cartModel");

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { products } = req.body; // List of products from request body
    const userId = req.user.id; // Logged-in user ID

    // Find existing cart or create a new one
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    // Add new products to cart
    cart.products = [...cart.products, ...products];
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get cart items for logged-in user
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addToCart, getCart };
