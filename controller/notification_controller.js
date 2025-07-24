const Notif = require("../model/notification");



/////////////////////////////////////////////

// the updated_at field is not being set properly, maybe due to some timestamp and time-size bug
// needed to be fized first before final

/////////////////////////////////////////////

exports.createNotif = async (req, res) => {

    //initialize notification
    const { agent_id, agent_name, message, notification_for } = req.body;

    //time
    const now = new Date();

    //create notofication
    const notif = await Notif.create({
        agent_id,
        agent_name,
        message,
        notification_for,
        updated_at: now
    });

    await notif.save();

    res.status(201).json({ message: "Notification created successfully" });
};

exports.showNotif = async(req, res)=> {
    try {
    const notifications = await Notif.findAll({
        order: [["created_at", "DESC"]] // optional: sort latest first
    });

    res.status(200).json(notifications);
    } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
    }
}

exports.readNotif = async(req, res) => {
    const {id} = req.body
    const notif = await Notif.findByPk(id);

    if(!notif)
        return res.status(400).json({error: "Invalid notification id"})

    notif.read = 0

    await notif.save()

    res.status(201).json({ message: "Notification read successfully"})
}