const express = require("express");
const router = express.Router();
const { signup, login } = require("../controller/agent_controller")
const{
    checkin, checkout
} = require("../controller/agent_att_controller")

//login
router.post("/login", login)

//jwt-middleware
router.use(auth);

//routes
router.post("/signup", signup)
router.post("/checkin", checkin)
router.post("/checkout", checkout)

module.exports = router;