const express = require("express");
const router = express.Router();
const { showNotif , createNotif, readNotif } = require("../controller/notification_controller")

//routes
router.post("/create", createNotif)
router.post("/read", readNotif)
router.get("/show", showNotif)

module.exports = router;