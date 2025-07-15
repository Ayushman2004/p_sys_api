const { Op } = require("sequelize");
const csv = require('csvtojson');
const fs = require('fs');
const Lead = require("../model/lead");

exports.getLead = async (req, res) => {
    try {

        if(req.user.type != "agent") return res.status(404).json({ error: "Only agents authorized"})
        const assigned_agent_id = req.user.id;
        
        const leadId = req.params.id;

        //check leadId's presence (extra layer for security)
        if (!leadId)
            return res.status(400).json({ error: "Lead ID is required" });

        //initialize lead
        const lead = await Lead.findByPk(leadId);

        if(lead.assigned != assigned_agent_id )
            return res.status(400).json( {error: "Agent not authorized"})

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

    if(req.user.type != "user") return res.status(404).json({ error: "Only user authorized"})

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

    if(req.user.type != "user") return res.status(404).json({ error: "Only user authorized"})

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


exports.importLeadFile = async (req, res) => {
  try {

    if(req.user.type != "user") return res.status(404).json({ error: "Only user authorized"})

    const filePath = req.file.path; // Path to the uploaded CSV file
    const fileName = req.file.originalname;

    // Convert CSV file to JSON
    const leads = await csv().fromFile(filePath);

    leads.forEach(lead => {
      lead.created_at = new Date();
    });


    // Optional: delete the file after reading
    fs.unlinkSync(filePath);


    await Lead.bulkCreate(leads); // for Sequelize

    res.status(200).json({
      message: "CSV imported successfully",
      filename: fileName,
      totalLeads: leads.length,
      data: leads
    });
  } catch (error) {
    console.error("Error importing CSV:", error);
    res.status(500).json({ error: "Failed to import CSV file" });
  }
}

exports.createLead = async (req, res) => {

    if(req.user.type != "user") return res.status(404).json({ error: "Only user authorized"})

    //initialize user
    const { 
      name,title, email, assigned, mobile, source, service,
      message, zip, city, state, address,
      country, website, date_contacted, description } = req.body;

    //find user
    const existingLead = await Lead.findOne({ where: { email } });

    //check if user already exists
    if (existingLead) return res.status(400).json({ error: "User already exists" });

    //back-end field computation
    const currentTime = new Date();
    
    //create user
    const lead = await Lead.create({
        name,title, email, assigned, mobile, source, service,
      message, zip, city, state, address,
      country, website, date_contacted, description,
      created_at: currentTime
    });

    await lead.save();

    // console.log("***************************************")
    // console.log("User created:", user);
    // console.log("***************************************")

    res.status(201).json({ message: "Lead created successfully" });
};