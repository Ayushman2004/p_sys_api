const express = require("express");
const router = express.Router();
const {
    getLead,
    deleteLead,
    bulkDeleteLeads,
} = require("../controller/lead_controller");


//routes
router.get("/:id", getLead)
router.delete("/:id", deleteLead)
router.post("/bulk-delete", bulkDeleteLeads)

module.exports = router;
