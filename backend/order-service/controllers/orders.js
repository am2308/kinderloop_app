const Order = require('../models/Order');
const axios = require('axios');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'user',
        select: 'name email'
      });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get seller orders
// @route   GET /api/orders/sellerorders
// @access  Private/Seller
exports.getSellerOrders = async (req, res) => {
  try {
    // Fetch products sold by this seller from the product service
    const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/api/products/seller`, {
      headers: {
        Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
      },
    });

    const products = response.data.data;
    const productIds = products.map(product => product._id);

    // Find orders containing these products
    const orders = await Order.find({
      'items.product': { $in: productIds }
    })
      .populate({
        path: 'user',
        select: 'name email'
      });

    // Filter out products that don't belong to this seller
    const filteredOrders = orders.map(order => {
      const sellerItems = order.items.filter(item => 
        productIds.includes(item.product.toString())
      );
      
      return {
        _id: order._id,
        user: order.user,
        items: sellerItems,
        shippingAddress: order.shippingAddress,
        status: order.status,
        createdAt: order.createdAt
      };
    });

    res.status(200).json({
      success: true,
      count: filteredOrders.length,
      data: filteredOrders
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email'
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `No order found with id ${req.params.id}`
      });
    }

    // Check if user is owner of the order or admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in the order'
      });
    }

    // Calculate total amount and check product availability
    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      // Fetch product details from the product service
      const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/api/products/${item.product}`, {
        headers: {
          Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
        },
      });
      const product = response.data.data;

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found with id ${item.product}`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product ${product.name}`
        });
      }
      
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      totalAmount += product.price * item.quantity;
      // Update product stock in the product service
      await axios.put(`${process.env.PRODUCT_SERVICE_URL}/api/products/${product._id}`, {
        stock: product.stock - item.quantity,
        status: product.stock - item.quantity === 0 ? 'sold' : product.status
      }, {
        headers: {
          Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
        },
      });
    }
    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `No order found with id ${req.params.id}`
      });
    }

    // If status is being updated to cancelled, restore product stock
    if (req.body.status === 'cancelled' && order.status !== 'cancelled') {
      for (const item of order.items) {
        const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/api/products/${item.product}`, {
          headers: {
            Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
          },
        });

        const product = response.data.data;

        if (product) {
          await axios.put(`${process.env.PRODUCT_SERVICE_URL}/api/products/${product._id}`, {
            stock: product.stock + item.quantity,
            status: product.status === 'sold' ? 'approved' : product.status
          }, {
            headers: {
              Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
            },
          });
        }
      }
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `No order found with id ${req.params.id}`
      });
    }

    // Restore product stock
    for (const item of order.items) {
      const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/api/products/${item.product}`, {
        headers: {
          Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
        },
      });

      const product = response.data.data;

      if (product) {
        await axios.put(`${process.env.PRODUCT_SERVICE_URL}/api/products/${product._id}`, {
          stock: product.stock + item.quantity,
          status: product.status === 'sold' ? 'approved' : product.status
        }, {
          headers: {
            Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
          },
        });
      }
    }

    await order.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};