const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, 'Please add a product ID'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be greater than 0']
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please add an original price']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Toys', 'Clothing', 'Books', 'Gear', 'Shoes', 'Accessories']
  },
  condition: {
    type: String,
    required: [true, 'Please add a condition'],
    enum: ['Like New', 'Excellent', 'Good']
  },
  ageRange: {
    type: String,
    required: [true, 'Please add an age range']
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: [0, 'Stock cannot be negative']
  },
  images: [{
    type: String,
    required: [true, 'Please add at least one image']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for better search performance
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ productId: 1 });

module.exports = mongoose.model('Product', ProductSchema);