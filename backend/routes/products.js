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

router.route('/')
  .get(getProducts)
  .post(protect, authorize('seller', 'admin'), createProduct);

router.get('/featured', getFeaturedProducts);
router.get('/seller', protect, authorize('seller'), getSellerProducts);

router.route('/:id')
  .get(getProduct)
  .put(protect, authorize('seller', 'admin'), updateProduct)
  .delete(protect, authorize('seller', 'admin'), deleteProduct);

router.post('/:id/upload', protect, authorize('seller', 'admin'), uploadProductImage);

module.exports = router;