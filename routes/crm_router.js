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

// Routes
router.post("/signup", signup);
router.post("/verify", verifyOtp);
router.post("/login", login);

//jwt-middleware
router.use(auth);

//below endpoints uses jwt-middleware
router.get("/profile", getProfile);
router.post("/edit", editProfile);

module.exports = router;
