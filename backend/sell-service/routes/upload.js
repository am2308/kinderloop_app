const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");

router.post("/get-presigned-url", uploadController.getPresignedUrl);

module.exports = router;