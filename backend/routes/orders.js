const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// Create new order - Protected route
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    // Add user to request body
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get user orders - Protected route
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort('-createdAt');

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;