const Listing = require('../models/Listing');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private
exports.createListing = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.seller = req.user.id;

  const listing = await Listing.create(req.body);

  res.status(201).json({
    success: true,
    data: listing
  });
});

// @desc    Get all listings for logged in user
// @route   GET /api/listings
// @access  Private
exports.getMyListings = asyncHandler(async (req, res, next) => {
  const listings = await Listing.find({ seller: req.user.id });

  res.status(200).json({
    success: true,
    count: listings.length,
    data: listings
  });
});

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Private
exports.getListing = asyncHandler(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(new ErrorResponse(`Listing not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns listing
  if (listing.seller.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this listing`, 401));
  }

  res.status(200).json({
    success: true,
    data: listing
  });
});

// @desc    Update listing status
// @route   PUT /api/listings/:id
// @access  Private
exports.updateListingStatus = asyncHandler(async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(new ErrorResponse(`Listing not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns listing
  if (listing.seller.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this listing`, 401));
  }

  listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: listing
  });
});

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private
exports.deleteListing = asyncHandler(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(new ErrorResponse(`Listing not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns listing
  if (listing.seller.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this listing`, 401));
  }

  await listing.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});