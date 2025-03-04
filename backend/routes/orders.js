const express = require('express');
const router = express.Router();
const { 
  getOrders, 
  getOrder, 
  createOrder, 
  updateOrder, 
  deleteOrder,
  getUserOrders,
  getSellerOrders
} = require('../controllers/orders');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(authorize('admin'), getOrders)
  .post(createOrder);

router.get('/myorders', getUserOrders);
router.get('/sellerorders', authorize('seller'), getSellerOrders);

router.route('/:id')
  .get(getOrder)
  .put(authorize('admin'), updateOrder)
  .delete(authorize('admin'), deleteOrder);

module.exports = router;