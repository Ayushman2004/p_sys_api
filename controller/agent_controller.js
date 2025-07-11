const bcrypt = require("bcryptjs");
const Agent = require("../model/agent");


exports.signup = async (req, res) => {

    //initialize agent
    const { title, email, agent_password, agent_type } = req.body;
    //find agent
    const existingAgent = await Agent.findOne({ where: { email } });

    //check if agent already exists
    if (existingAgent) return res.status(400).json({ error: "Agent already exists" });

    //back-end field computation
    const hashedPassword = await bcrypt.hash(agent_password, 10);

    //create user
    const agent = await Agent.create({
        title,
        email,
        agent_password: hashedPassword,
        agent_type,
    });

    await agent.save();

    res.status(201).json({ message: "Agent created successfully" });
};