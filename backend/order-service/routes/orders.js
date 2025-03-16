const express = require('express');
const router = express.Router();
const { 
  getOrders, 
  getUserOrders, 
  getSellerOrders, 
  getOrder, 
  createOrder, 
  updateOrder, 
  deleteOrder 
} = require('../controllers/orders');
const { protect, authorize } = require('../middleware/auth');

// Public routes (if any)
// router.get('/', getOrders);

// Protected routes
router.use(protect);

// User routes
router.get('/myorders', getUserOrders);
router.post('/', createOrder);
router.get('/:id', getOrder);

// Seller routes
router.get('/sellerorders', authorize('seller'), getSellerOrders);

// Admin routes
router.get('/', authorize('admin'), getOrders);
router.put('/:id', authorize('admin'), updateOrder);
router.delete('/:id', authorize('admin'), deleteOrder);

module.exports = router;