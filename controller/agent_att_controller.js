const AgentAtt = require("../model/agent_attendence");
const Agent = require("../model/agent")

exports.checkin = async (req, res) => {
  try {
    if (req.user.type !== "agent")
      return res.status(403).json({ error: "Only agents authorized" });

    const agent_id = req.user.id;
    const { checkin_message, checkin_location } = req.body;

    // Check if already checked-in
    const latestAttendance = await AgentAtt.findOne({
      where: { agent_id },
      order: [["checkin_time", "DESC"]],
    });

    if (latestAttendance.checkout_time === null)
      return res.status(400).json({ error: "Already checked-in" });

    // Perform check-in
    const agent_att = await AgentAtt.create({
      agent_id,
      checkin_message,
      checkin_location,
      checkin_time: new Date(),
      checkout_time: null,
    });

    await agent_att.save();

    res.status(201).json({ message: "Check-in successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.checkout = async (req, res) => {
  try {
    if (req.user.type !== "agent")
      return res.status(403).json({ error: "Only agents authorized" });

    const { checkout_location, checkout_message } = req.body;
    const agent_id = req.user.id;

    const latestAttendance = await AgentAtt.findOne({
      where: { agent_id},
      order: [["checkin_time", "DESC"]],
    });

    if (!latestAttendance)
      return res.status(404).json({ error: "No attendance record found" });

    if (latestAttendance.checkout_time !== null)
      return res.status(400).json({ error: "Already checked-out or not checked-in" });

    latestAttendance.checkout_time = new Date();
    latestAttendance.checkout_location = checkout_location;
    latestAttendance.checkout_message = checkout_message;

    await latestAttendance.save();

    res.status(201).json({ message: "Check-out successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};