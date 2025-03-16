const express = require('express');
const router = express.Router();
const { register, login, getMe, updateDetails, updatePassword, validateToken } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/validate-token', validateToken); // New route for token validation
module.exports = router;