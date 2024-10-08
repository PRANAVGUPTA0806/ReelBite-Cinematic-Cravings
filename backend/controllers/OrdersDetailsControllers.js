const Order = require('../models/OrdersDetailModel');


// Create a new order
const createOrder = async (req, res) => {
  try {
    const { paymentSource,payment_status,payment_date,order_summary,paymentID,billing_information,email_address,national_number,} = req.body;
    
    const newOrder = new Order({
      userId: req.user._id, 
      order_summary,
      paymentID:paymentID,
      billing_address:billing_information,
      email_address:email_address,
      paymentSource: paymentSource,
      national_number:national_number,
      payment_status:payment_status,
      payment_date:payment_date,
    });

    const savedOrder = await newOrder.save();
    
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order', details: error.message });
  }
};

// Get all orders for admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
const getOrders = async (req, res) => { 
  try {
    const userId = req.user._id; // Assuming userId is in req.user after authentication

    const orders = await Order.find({ userId: userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
// Get a single order by ID for a user
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, userId: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the order', details: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.order_history.push({ status, updated_at: Date.now(), remarks: req.body.remarks });
    order.order_summary.status = status;
    await order.save();
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status', details: error.message });
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, userId: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.order_summary.status !== 'Pending') {
      return res.status(400).json({ message: 'Only pending orders can be canceled' });
    }
    order.order_summary.status = 'Cancelled';
    order.order_history.push({ status: 'Cancelled', updated_at: Date.now(), remarks: 'Order cancelled by user' });
    await order.save();
    res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel the order', details: error.message });
  }
};

// Add payment information
const addPaymentInfo = async (req, res) => {
  try {
    const { payment_method, transaction_id, payment_status } = req.body;
    
    const order = await Order.findOne({ _id: req.params.orderId, userId: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.order_summary.payment_status = payment_status || 'Pending';
    order.order_summary.payment_history.push({
      payment_method,
      transaction_id,
      payment_status,
      payment_date: Date.now()
    });

    await order.save();
    res.status(200).json({ message: 'Payment added successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add payment', details: error.message });
  }
};

// Update shipping details
const updateShippingDetails = async (req, res) => {
  try {
    const { shipping_method, tracking_number, estimated_delivery_date } = req.body;
    
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.shipping_information.shipping_method = shipping_method;
    order.shipping_information.tracking_number = tracking_number;
    order.shipping_information.estimated_delivery_date = estimated_delivery_date;

    order.order_history.push({ status: 'Shipped', updated_at: Date.now(), remarks: 'Shipping details updated' });

    await order.save();
    res.status(200).json({ message: 'Shipping details updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update shipping details', details: error.message });
  }
};

// Process refund
const processRefund = async (req, res) => {
  const { refund_status, refund_amount } = req.body;
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.refund_information.refund_status = refund_status || 'Requested';
    order.refund_information.refund_amount = refund_amount;
    order.refund_information.refund_date = Date.now();
    order.order_summary.payment_status = 'Refunded';

    order.order_history.push({ status: 'Refunded', updated_at: Date.now(), remarks: `Refund of $${refund_amount} processed` });

    await order.save();
    res.status(200).json({ message: 'Refund processed successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process refund', details: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  addPaymentInfo,
  updateShippingDetails,
  processRefund,
  getOrders
};
