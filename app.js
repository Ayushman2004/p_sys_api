const express = require("express");
const sequelize = require("./config/db");
const crmRoutes = require("./routes/crm_router");
const leadRouter = require("./routes/lead_router")
const notifRouter = require("./routes/notification_router")
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MySQL
sequelize.sync()
    .then(() => console.log("MySQL connected"))
    .catch(console.error);

// Routes
app.use("/notif", notifRouter)
app.use("/lead", leadRouter)
app.use("/", crmRoutes)

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
