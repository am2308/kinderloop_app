const express = require("express");
const router = express.Router();
const { 
  createListing,
  getMyListings,
  getListing,
  updateListingStatus,
  deleteListing
} = require("../controllers/sellController");
const { protect } = require("../middleware/auth");

// Protect all routes
router.use(protect);

// Create new listing
router.post("/", createListing);

// Get user's listings
router.get("/", getMyListings);

// Update listing status
router.put("/:id", updateListingStatus);

// Get single listing
router.get("/:id", getListing);

// Delete listing
router.delete("/:id", deleteListing);

module.exports = router;