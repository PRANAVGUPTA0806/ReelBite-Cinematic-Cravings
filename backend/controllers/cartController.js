const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/moviesModel');
const Product1 = require('../models/foodModel');

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user ? req.user._id : null;
    const sessionId = req.sessionID; // For guest users

    let product = await Product.findById(productId);

    // If the product is not found in the Product model, try Product1
    if (!product) {
        product = await Product1.findById(productId);
        if (!product) {
            return res.status(400).json({ message: 'Insufficient stock or product not available' });
        }
    }

    // Get or create a cart (based on userId or sessionId)
    let cart;
    if (userId) {
        cart = await Cart.findOne({ userId, isExpired: false }) || new Cart({ userId, items: [] });
    } else {
        cart = await Cart.findOne({ sessionId, isExpired: false }) || new Cart({ sessionId, items: [] });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
        // If it exists, update the quantity and total price
        const item = cart.items[itemIndex];
        item.quantity += quantity;
        item.totalPrice = item.price * item.quantity;
    } else {
        // Otherwise, add a new product to the cart
        cart.items.push({
            productId: product._id,
            productName: product.productName,
            image: product.image,
            productDescription:product.productDescription ,
            price: product.productPrice,
            quantity,
            totalPrice: product.productPrice * quantity
        });
    }

    // Calculate the total price
    const subTotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);

    cart.totalPrice = subTotal;
const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0); // Calculate total quantity
cart.totalQuantity = totalQuantity;
    // Set cart expiration (e.g., 30 days)
    cart.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // Save the cart
    await cart.save();

    res.status(200).json(cart);
});


const removeFromCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user ? req.user._id : null; 
    const sessionId = req.sessionID; // For guest users

    if (!productId || quantity === undefined) {
        return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    // Find product
    let product = await Product.findById(productId);
    if (!product) {
        product = await Product1.findById(productId);
        if (!product) {
            return res.status(400).json({ message: 'Product not available' });
        }
    }

    // Find cart
    let cart;
    if (userId) {
        cart = await Cart.findOne({ userId, isExpired: false });
    } else {
        return res.status(404).json({ message: 'Cart not found or expired' });
    }
    // const cart = await Cart.findOne({ $or: [{ userId }, { sessionId }], isExpired: false });
    // if (!cart) {
    //     return res.status(404).json({ message: 'Cart not found or expired' });
    // }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
        const item = cart.items[itemIndex];

        // Ensure that the requested quantity to remove does not exceed the current quantity
        if (quantity > item.quantity) {
            return res.status(400).json({ message: 'Quantity to remove exceeds item quantity in cart' });
        }

        // Decrease the quantity or remove the item if necessary
        item.quantity -= quantity;

        if (item.quantity <= 0) {
            // Remove the item from the cart if the quantity becomes zero or less
            cart.items.splice(itemIndex, 1);
        } else {
            // Update the total price if the item remains in the cart
            item.totalPrice = item.price * item.quantity;
        }

        // Recalculate the cart's total price
        const subTotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
        cart.totalPrice = subTotal;
        const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0); 
        cart.totalQuantity = totalQuantity;

        await cart.save();
        return res.status(200).json(cart);
    } else {
        return res.status(404).json({ message: 'Item not found in cart' });
    }
});



const getCart = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user._id : null;
//   const sessionId = req.sessionID;

  // Find cart
  const cart = await Cart.findOne({  userId , isExpired: false });
  if (!cart || new Date() > cart.expiresAt) {
      return res.status(404).json({ message: 'Cart not found or expired' });
  }

  res.status(200).json(cart);
});

const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const cart = await Cart.findOne({ userId });
  if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = [];
  cart.totalPrice = 0;
  cart.taxAmount = 0;
  cart.shippingCost = 0;
  cart.discountAmount = 0;
  cart.totalQuantity=0;

  await cart.save();
  res.status(200).json({ message: 'Cart cleared' });
});

const addToCart1 = asyncHandler(async (req, res) => {
    
    const { productId, quantity } = req.body;
    const userId = req.user ? req.user._id : null; 
    console.log(userId);
     // Check if logged in
    const sessionId = req.sessionID; // For guest users

    // Find product and validate stock
    const product = await Product1.findById(productId);
    if (!product ) {
        return res.status(400).json({ message: 'Insufficient stock or product not available' });
    }

    // Get or create a cart (based on userId or sessionId)
    let cart;
    if (userId) {
        cart = await Cart.findOne({ userId, isExpired: false }) || new Cart({ userId, items: [] });
    } else {
        cart = await Cart.findOne({ sessionId, isExpired: false }) || new Cart({ sessionId, items: [] });
    }

    // Check if product already exists in cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
        // Update quantity if product exists
        const item = cart.items[itemIndex];
        item.quantity += quantity;
        item.totalPrice = item.price * item.quantity;
    } else {
        // Add new product to cart
        cart.items.push({
            productId: product._id,
            productName: product.productName,
            image: product.image,
            price: product.productPrice,
            quantity,
            totalPrice: product.productPrice * quantity
        });
    }



    // Calculate total price, discount, tax, and shipping
    const subTotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    // cart.taxAmount = subTotal * 0.1; // Assuming 10% tax
    // cart.shippingCost = subTotal > 100 ? 0 : 10; // Free shipping for orders > $100
    cart.totalPrice = subTotal  ;
    const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0); 
    cart.totalQuantity = totalQuantity;

    // cart.totalPrice = subTotal + cart.taxAmount + cart.shippingCost - cart.discountAmount;

    // Set cart expiration (e.g., 30 days)
    cart.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); 

    // Save cart
    await cart.save();

    res.status(200).json(cart);

});

const removeFromCart1 = asyncHandler(async (req, res) => {
const { productId } = req.body;
const userId = req.user ? req.user._id : null;
const sessionId = req.sessionID;

// Find cart
let cart;
if (userId) {
    cart = await Cart.findOne({ userId, isExpired: false });
} else {
    return res.status(404).json({ message: 'Cart not found or expired' });
}
// Remove item from cart
cart.items = cart.items.filter(item => item.productId.toString() !== productId);
const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0); 
cart.totalQuantity = totalQuantity;

// Recalculate total
const subTotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
// cart.taxAmount = subTotal * 0.1;
cart.totalPrice = subTotal;

await cart.save();
res.status(200).json(cart);
});

const getCart1 = asyncHandler(async (req, res) => {
const userId = req.user ? req.user._id : null;
const sessionId = req.sessionID;

// Find cart
const cart = await Cart.findOne({ $or: [{ userId }, { sessionId }], isExpired: false }).populate('items.productId');
if (!cart || new Date() > cart.expiresAt) {
    return res.status(404).json({ message: 'Cart not found or expired' });
}

res.status(200).json(cart);
});

const clearCart1 = asyncHandler(async (req, res) => {
const userId = req.user._id;

const cart = await Cart.findOne({ userId });
if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
}

cart.items = [];
cart.totalPrice = 0;
cart.taxAmount = 0;
cart.shippingCost = 0;
cart.discountAmount = 0;
cart.totalQuantity=0;

await cart.save();
res.status(200).json({ message: 'Cart cleared' });
});

module.exports={ addToCart, removeFromCart, getCart, clearCart,addToCart1, removeFromCart1, getCart1, clearCart1 };

