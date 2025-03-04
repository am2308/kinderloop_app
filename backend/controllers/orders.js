const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'user',
        select: 'name email'
      })
      .populate({
        path: 'products.product',
        select: 'name price images'
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
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: 'products.product',
        select: 'name price images'
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

// @desc    Get seller orders
// @route   GET /api/orders/sellerorders
// @access  Private/Seller
exports.getSellerOrders = async (req, res) => {
  try {
    // Find all products by this seller
    const products = await Product.find({ seller: req.user.id });
    const productIds = products.map(product => product._id);

    // Find orders containing these products
    const orders = await Order.find({
      'products.product': { $in: productIds }
    })
      .populate({
        path: 'user',
        select: 'name email'
      })
      .populate({
        path: 'products.product',
        select: 'name price images seller'
      });

    // Filter out products that don't belong to this seller
    const filteredOrders = orders.map(order => {
      const sellerProducts = order.products.filter(item => 
        item.product.seller && item.product.seller.toString() === req.user.id
      );
      
      return {
        _id: order._id,
        user: order.user,
        products: sellerProducts,
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
      })
      .populate({
        path: 'products.product',
        select: 'name price images seller'
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `No order found with id ${req.params.id}`
      });
    }

    // Check if user is owner of the order or admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      // Check if user is seller of any product in the order
      const isSeller = order.products.some(item => 
        item.product.seller && item.product.seller.toString() === req.user.id
      );
      
      if (!isSeller && req.user.role === 'seller') {
        return res.status(401).json({
          success: false,
          message: 'Not authorized to access this order'
        });
      }
      
      // If user is seller, filter products to only show their own
      if (isSeller && req.user.role === 'seller') {
        order.products = order.products.filter(item => 
          item.product.seller && item.product.seller.toString() === req.user.id
        );
      }
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
    const { products, shippingAddress, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No products in the order'
      });
    }

    // Calculate prices and check product availability
    let totalPrice = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found with id ${item.product}`
        });
      }
      
      if (product.status === 'sold') {
        return res.status(400).json({
          success: false,
          message: `Product ${product.name} is already sold`
        });
      }
      
      orderProducts.push({
        product: product._id,
        quantity: item.quantity || 1,
        price: product.price
      });
      
      totalPrice += product.price * (item.quantity || 1);
      
      // Update product status to sold
      product.status = 'sold';
      await product.save();
    }

    // Create order
    const order = await Order.create({
      user: req.user.id,
      products: orderProducts,
      shippingAddress,
      paymentMethod,
      totalPrice
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

    // Update product status back to approved
    for (const item of order.products) {
      const product = await Product.findById(item.product);
      if (product) {
        product.status = 'approved';
        await product.save();
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