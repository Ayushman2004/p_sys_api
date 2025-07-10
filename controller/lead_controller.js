const { Op } = require("sequelize");
const Lead = require("../model/lead");

exports.getLead = async (req, res) => {
    try {

        const leadId = req.params.id;

        //check leadId's presence (extra layer for security)
        if (!leadId)
            return res.status(400).json({ error: "Lead ID is required" });

        //initialize lead
        const lead = await Lead.findByPk(leadId);

        //check lead validity
        if (!lead) return res.status(404).json({ error: "Lead not found" });

        res.json({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        mobile: lead.mobile,
        title: lead.title,
        source: lead.source,
        service: lead.service,
        message: lead.message,
        assigned: lead.assigned,
        zip: lead.zip,
        city: lead.city,
        state: lead.state,
        country: lead.country,
        website: lead.website,
        date_contacted: lead.date_contacted,
        address: lead.address,
        description: lead.description,
        status: lead.status,
        created_at: lead.created_at,
        updated_at: lead.updated_at
        });
    } catch (err) {
        console.error("Profile error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}


exports.deleteLead = async (req, res) => {
  try {
    const leadId = req.params.id;

    //check leadId's presence (extra layer for security)
    if (!leadId) {
      return res.status(400).json({ error: "Lead ID is required" });
    }

    //delete lead
    const deleted = await Lead.destroy({
      where: { id: leadId }
    });

    //lead-validity (past)
    if (deleted === 0) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.json({ message: `Lead with ID ${leadId} deleted successfully.` });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}


exports.bulkDeleteLeads = async (req, res) => {
  try {
    const idsToDelete = req.body.delete;

    //check if a non-empty valid array is provided or not
    if (!Array.isArray(idsToDelete) || idsToDelete.length === 0) {
      return res.status(400).json({ error: "A non-empty array of IDs is required under the 'delete' key." });
    }

    //delete leads
    const deletedCount = await Lead.destroy({
      where: {
        id: {
          [Op.in]: idsToDelete
        }
      }
    });

    res.json({ message: `Successfully deleted ${deletedCount} lead(s).` });
  } catch (err) {
    console.error("Bulk delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};