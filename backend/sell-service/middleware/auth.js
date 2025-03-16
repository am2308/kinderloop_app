const axios = require('axios');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
      // Verify token
      const response = await axios.post('http://localhost:5002/api/auth/validate-token', { token });
      req.user = response.data.data; // Set user information in request
      //const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
};

module.exports = { protect };