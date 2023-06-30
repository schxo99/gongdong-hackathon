const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController")

router.post("/", donationController.donation);

router.post("/pick", donationController.pick);

module.exports = router;
