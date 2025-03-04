const express = require("express");
const router = express.Router();
const sellController = require("../controllers/sellController");

router.post("/", sellController.submitItem);

module.exports = router;