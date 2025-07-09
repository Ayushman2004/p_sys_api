const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.HASH_KEY);
        req.user = decoded;
        next();
    } catch {
        res.status(400).json({ error: "Invalid token" });
    }
};
