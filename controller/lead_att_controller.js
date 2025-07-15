const LeadAtt = require("../model/lead_attendence");
const Lead = require("../model/lead")


exports.checkin = async (req, res) => {
  try {
    if (req.user.type !== "agent")
      return res.status(403).json({ error: "Only agents authorized" });

    const assigned_agent_id = req.user.id;
    const { lead_id, lead_name, photo, checkin_message, checkin_location } = req.body;

    const lead = await Lead.findByPk(lead_id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    if (lead.assigned !== assigned_agent_id)
      return res.status(403).json({ error: "Agent not authorized" });

    // Check if already checked-in
    const latestAttendance = await LeadAtt.findOne({
      where: { lead_id },
      order: [["checkin_time", "DESC"]],
    });

    if (latestAttendance && latestAttendance.checkout_time === null)
      return res.status(400).json({ error: "Already checked-in" });

    // Perform check-in
    const lead_att = await LeadAtt.create({
      lead_id,
      lead_name,
      photo,
      checkin_message,
      checkin_location,
      checkin_time: new Date(),
      checkout_time: null,
    });

    res.status(201).json({ message: "Check-in successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.checkout = async (req, res) => {
  try {
    if (req.user.type !== "agent")
      return res.status(403).json({ error: "Only agents authorized" });

    const assigned_agent_id = req.user.id;
    const { lead_id, checkout_location, checkout_message } = req.body;

    if (!lead_id)
      return res.status(400).json({ error: "Missing lead_id in request body" });

    const latestAttendance = await LeadAtt.findOne({
      where: { lead_id },
      order: [["checkin_time", "DESC"]],
    });

    if (!latestAttendance)
      return res.status(404).json({ error: "No attendance record found" });

    if (latestAttendance.checkout_time !== null)
      return res.status(400).json({ error: "Already checked-out or not checked-in" });

    const lead = await Lead.findByPk(lead_id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    if (lead.assigned !== assigned_agent_id)
      return res.status(403).json({ error: "Agent not authorized" });

    latestAttendance.checkout_time = new Date();
    latestAttendance.checkout_location = checkout_location;
    latestAttendance.checkout_message = checkout_message;

    await latestAttendance.save();

    res.status(201).json({ message: "Check-out successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};