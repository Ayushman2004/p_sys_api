const express = require("express");
const sequelize = require("./config/db");
const crmRoutes = require("./routes/crm_router");
const leadRouter = require("./routes/lead_router")
const notifRouter = require("./routes/notification_router")
const agentRouter = require("./routes/agent_router")
const taskRouter = require("./routes/task_router")
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MySQL
sequelize.sync()
    .then(() => console.log("MySQL connected"))
    .catch(console.error);

// Routes
app.use("/api/agent", agentRouter)
app.use("/api/notif", notifRouter)
app.use("/api/lead", leadRouter)
app.use("/api/task", taskRouter)
app.use("/api", crmRoutes)

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
