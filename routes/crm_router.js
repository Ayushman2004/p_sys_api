const express = require("express");
const router = express.Router();
const auth = require("../jwt/auth");
const {
    signup,
    verifyOtp,
    login,
    getProfile,
    editProfile
} = require("../controller/auth_controller");


router.post("/login", login);
router.post("/signup", signup);
router.post("/verify", verifyOtp);

//jwt-middleware
router.use(auth);

// Routes
router.get("/profile", getProfile);
router.post("/edit", editProfile);

module.exports = router;
