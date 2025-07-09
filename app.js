const express = require("express");
const sequelize = require("./sql/db");
const userRoutes = require("./routes/router");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MySQL
sequelize.sync()
    .then(() => console.log("MySQL connected"))
    .catch(console.error);

// Routes
app.use("/", userRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
