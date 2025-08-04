const express = require("express");
const router = express.Router();
const auth = require("../jwt/auth");
const { showTask , createTask, doneTask } = require("../controller/task_controller")


router.use(auth);

//routes
router.post("/create", createTask)
router.post("/done", doneTask)
router.post("/show", showTask)

module.exports = router;