const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  validateCredentials,
  updatePassword,
} = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/validate', validateCredentials);

// Protected routes
//router.use(protect);
//router.use(authorize('admin'));

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.put('/:id/password', updatePassword);

module.exports = router;