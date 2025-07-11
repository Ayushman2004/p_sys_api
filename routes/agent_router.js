const express = require("express");
const router = express.Router();
const { signup } = require("../controller/agent_controller")

//routes
router.post("/signup", signup)

module.exports = router;