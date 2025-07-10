const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
    getLead,
    deleteLead,
    bulkDeleteLeads,
    importLeadFile,
} = require("../controller/lead_controller");

const upload = multer({ dest: "uploads/" });

//routes
router.get("/:id", getLead)
router.delete("/:id", deleteLead)
router.post("/bulk-delete", bulkDeleteLeads)
router.post("/import", upload.single("file"), importLeadFile)

module.exports = router;

