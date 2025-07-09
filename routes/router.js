const express = require("express");
const router = express.Router();
const auth = require("../jwt/auth");
const {
    signup,
    verifyOtp,
    login,
    getProfile,
    editProfile
} = require("./controller");

// Routes
router.post("/signup", signup);
router.post("/verify", verifyOtp);
router.post("/login", login);

//below endpoints uses jwt-middleware
router.get("/profile", auth, getProfile);
router.post("/edit", auth, editProfile);

module.exports = router;
