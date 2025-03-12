// async.js in the middleware directory
const asyncHandler = (fn) => (req, res, next) => {
    // Wrap the asynchronous function in a Promise.resolve to handle both synchronous and asynchronous errors
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  module.exports = asyncHandler;