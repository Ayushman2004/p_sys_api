const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
    getLead,
    deleteLead,
    bulkDeleteLeads,
    importLeadFile,
    createLead
} = require("../controller/lead_controller");
const{
    checkin, checkout
} = require("../controller/lead_att_controller")
const auth = require("../jwt/auth");

const upload = multer({ dest: "uploads/" });

//jwt-middleware
router.use(auth);

//routes
router.get("/:id", getLead)
router.delete("/:id", deleteLead)
router.post("/bulk-delete", bulkDeleteLeads)
router.post("/create", createLead)
router.post("/import", upload.single("file"), importLeadFile)
router.post("/checkin", checkin )
router.post("/checkout", checkout)

module.exports = router;

