const express = require("express");
const router = express.Router();
const promiseController = require("../controllers/promiseController")

router.post("/", promiseController.promise);

router.post("/promiseDate", promiseController.promiseDate)

router.post("/create", promiseController.createPromise);

router.post("/join", promiseController.joinPromise);

router.post("/live", promiseController.gps);



module.exports = router;
