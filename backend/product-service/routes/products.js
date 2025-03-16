const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getFeaturedProducts,
  getSellerProducts,
  uploadProductImage
} = require('../controllers/products');
const { protect, authorize } = require('../middleware/auth');

//router.use(protect);
// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);

// Protected routes

// Seller and admin routes
router.use(protect);
router.post('/', authorize('seller', 'admin'), createProduct);
router.get('/seller', authorize('seller'), getSellerProducts);
router.put('/:id', updateProduct);
//router.route('/:id', updateProduct, deleteProduct)
//  .put(authorize('admin'), updateProduct)
//  .delete(authorize('seller', 'admin'), deleteProduct);
router.post('/:id/upload', authorize('seller', 'admin'), uploadProductImage);

module.exports = router;