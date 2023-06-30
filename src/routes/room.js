const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController")

router.get("/", roomController.viewRoom);

router.post("/", roomController.joinRoom);

router.post("/myJoinRoom", roomController.myJoinRoom);

router.post("/chat", roomController.postChat);



module.exports = router;
