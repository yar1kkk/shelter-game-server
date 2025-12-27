const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.get("/", roomController.getRooms);
router.post("/", roomController.createRoom);
router.post("/start", roomController.startRoom);
router.get("/:id", roomController.getRoom);
router.put("/:id", roomController.updateRoom);

module.exports = router;
