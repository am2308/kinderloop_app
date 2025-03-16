const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: [true, 'Please provide item type']
  },
  price: {
    type: Number,
    required: [true, 'Please provide item price']
  },
  count: {
    type: Number,
    required: [true, 'Please provide item count']
  },
  description: {
    type: String,
    required: [true, 'Please provide item description']
  },
  category: {
    type: String,
    required: [true, 'Please provide item category']
  },
  weight: String,
  dimensions: String,
  itemUrl: String,
  wantsPackaging: {
    type: Boolean,
    default: false
  },
  address: String,
  images: {
    type: [String],
    required: [true, 'Please provide at least one image']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'sold'],
    default: 'pending'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Listing', listingSchema);