const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Check file type
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only image files are allowed!'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000 } // 1MB
}).array('images', 5);

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Basic query
    query = Product.find(JSON.parse(queryStr));

    // Search functionality
    if (req.query.search) {
      query = query.find({ $text: { $search: req.query.search } });
    }

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Populate seller info
    query = query.populate({
      path: 'seller',
      select: 'name'
    });

    // Execute query
    const products = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: products.length,
      pagination,
      data: products
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true, status: 'approved', stock: { $gt: 0 } })
      .populate({
        path: 'seller',
        select: 'name'
      })
      .limit(8);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get seller products
// @route   GET /api/products/seller
// @access  Private/Seller
exports.getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    //const product = await Product.findById(req.params.id).populate({
    //  path: 'seller',
    //  select: 'name'
    //});

    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(req.params.id).populate('seller', 'name');
    } else {
      product = await Product.findOne({ productId: parseInt(req.params.id) }).populate('seller', 'name');
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Seller/Admin
exports.createProduct = async (req, res) => {
  try {
    req.body.seller = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Seller/Admin
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with id ${req.params.id}`
      });
    }

    // Make sure user is product owner or admin
    if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this product`
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Seller/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with id ${req.params.id}`
      });
    }

    // Make sure user is product owner or admin
    if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this product`
      });
    }

    await product.remove();

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

// @desc    Upload product images
// @route   POST /api/products/:id/upload
// @access  Private/Seller/Admin
exports.uploadProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with id ${req.params.id}`
      });
    }

    // Make sure user is product owner or admin
    if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this product`
      });
    }

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
      
      product.images = [...product.images, ...imageUrls];
      await product.save();

      res.status(200).json({
        success: true,
        data: product
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
