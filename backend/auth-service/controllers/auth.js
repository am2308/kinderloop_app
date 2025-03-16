const axios = require('axios');
const jwt = require('jsonwebtoken');

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Call Users Service to create a new user
    //console.log('Request to Register Service:', req.body); // Debugging
    const response = await axios.post('http://localhost:5001/api/users', {
      name,
      email,
      password,
      role: role || 'buyer',
    });

    // Generate JWT and send response
    sendTokenResponse(response.data, 201, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call Users Service to validate credentials
    const response = await axios.post('http://localhost:5001/api/users/validate', {
      email,
      password,
    });
    //console.log('Response from Users Service:', response.data); // Debugging

    // Generate JWT and send response
    sendTokenResponse(response.data, 200, res);
  } catch (err) {
    console.error('Error in login:', err.message); // Debugging
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get current logged in user
exports.getMe = async (req, res) => {
  try {
    // Call Users Service to get user details
    //console.log('Authorization:', req); // Debugging
    const response = await axios.get(`http://localhost:5001/api/users/${req.user.id}`, {
      headers: { Authorization: req.headers.authorization },
    });
    //console.log('Response from Users Service getMe:', response.data); // Debugging
    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    console.error('Error in getMe:', err.message); // Debugging
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Update user details
exports.updateDetails = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
    };

    // Call Users Service to update user details
    const response = await axios.put(`http://localhost:5001/api/users/${req.user.id}`, fieldsToUpdate, {
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Call Users Service to update password
    const response = await axios.put(
      `http://localhost:5001/api/users/${req.user.id}/password`,
      { currentPassword, newPassword },
      { headers: { Authorization: req.headers.authorization } }
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Validate token (for other services)
exports.validateToken = async (req, res) => {
    try {
      const { token } = req.body;
  
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Return user information
      res.status(200).json({
        success: true,
        data: {
          id: decoded.id,
          role: decoded.role,
        },
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }
  };
  

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user.data.id, role: user.data.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  //console.log('Response from Send Token:', user.data); // Debugging

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user.data.id,
      name: user.data.name,
      email: user.data.email,
      role: user.data.role,
    },
  });
};