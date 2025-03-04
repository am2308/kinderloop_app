const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['Clothing', 'Toys', 'Books', 'Gear', 'Other']
  },
  condition: {
    type: String,
    required: [true, 'Please specify the condition'],
    enum: ['New', 'Like New', 'Good', 'Fair', 'For Parts']
  },
  ageGroup: {
    type: String,
    required: [true, 'Please specify the age group'],
    enum: ['0-12 months', '1-2 years', '3-5 years', '6-8 years', '9-12 years', '12+ years']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  originalPrice: {
    type: Number
  },
  images: [String],
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'sold', 'refurbishing'],
    default: 'pending'
  },
  isRefurbished: {
    type: Boolean,
    default: false
  },
  refurbishmentDetails: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);