const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      condition, 
      ageRange, 
      minPrice, 
      maxPrice, 
      search,
      sort = 'createdAt',
      page = Number(req.query.page) || 1,
      limit = Number(req.query.limit) || 12
    } = req.query;

    const query = {};

    // Apply filters
    if (category) query.category = category;
    if (condition) query.condition = condition;
    if (ageRange) query.ageRange = ageRange;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    //const skip = (page - 1) * limit;
    const skip = Math.max(0, (page - 1) * limit);

    // Get products
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    // Get total count
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;