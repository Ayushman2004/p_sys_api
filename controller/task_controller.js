const Task = require("../model/task");



exports.createTask = async (req, res) => {

    if (req.user.type !== "user") return res.status(404).json({ error: "Only users authorized"})

    //initialize task
    const { agent_id,  bod } = req.body;

    //time
    const now = new Date();

    //create Task
    const task = await Notif.create({
        agent_id,
        bod,
        created_at: now
    });

    await task.save();

    res.status(201).json({ message: "Task created successfully" });
};

exports.showTask = async(req, res)=> {
    try {
    if (req.user.type !== "agent") return res.status(404).json({ error: "Only  agent authorized"})

    const task = await Task.findAll({
    where: {
        agent_id: req.user.id
    },
    order: [["created_at", "DESC"]]
    });

    res.status(200).json(task);
    } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
    }
}

exports.doneTask = async(req, res) => {
    if (req.user.type !== "agent") return res.status(404).json({ error: "Only  agent authorized"})

    const {id} = req.body
    const task = await Task.findByPk(id);

    if(!notif) return res.status(400).json({error: "Invalid notification id"})

    if(task.agent_id != req.user.id) return res.status(400).json({error: "Agent not authorized"})

    task.status = 1
    task.completed_at = now

    //time
    const now = new Date();


    await task.save()

    res.status(201).json({ message: "Task done successfully"})
}