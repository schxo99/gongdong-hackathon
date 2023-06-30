const express = require("express");
const router = express.Router();
const pool = require("../../middleware/db");

router.get("/", async (req, res) => {
    try {
       // res.render("map")
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
