const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: ['Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    //required: ['Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    //required: ['Please specify a category'],
    enum: ['Clothing', 'Toys', 'Books', 'Gear', 'Other', 'bicycles', 'Accessories']
  },
  condition: {
    type: String,
    //required: ['Please specify the condition'],
    enum: ['New', 'Like New', 'Good', 'Fair', 'For Parts']
  },
  ageGroup: {
    type: String,
    //required: ['Please specify the age group'],
    enum: ['0-12 months', '1-2 years', '3-5 years', '6-8 years', '9-12 years', '12+ years']
  },
  price: {
    type: Number,
    //required: ['Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  images: [String],
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    //required: true
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
  stock: {
    type: Number,
    default: 1,
    min: [0, 'Stock cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ seller: 1, createdAt: -1 });

module.exports = mongoose.model('Product', ProductSchema);