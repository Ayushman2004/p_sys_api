const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

    //create agent
    const agent = await Agent.create({
        title,
        email,
        agent_password: hashedPassword,
        agent_type,
    });

    await agent.save();

    res.status(201).json({ message: "Agent created successfully" });
};

exports.login = async (req, res) => {

    //initialize agent
    const { email, agent_password } = req.body;
    const agent = await Agent.findOne({ where: { email } });

    //check agent existence
    if (!agent) return res.status(400).json({ error: "Invalid email or password" });
    //password-authentication
    const valid = await bcrypt.compare(agent_password, agent.agent_password);
    if (!valid) return res.status(400).json({ error: "Invalid email or password" });

    //create jwt-token - 1hr validity
    const token = jwt.sign({ id: agent.id, email: agent.email, type: "agent" }, process.env.HASH_KEY, { expiresIn: "1h" });

    // console.log("***************************************")
    // console.log("User login:", user)
    // console.log("***************************************")

    res.json({ token });
};