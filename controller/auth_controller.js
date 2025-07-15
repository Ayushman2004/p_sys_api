const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");


//sign-up
exports.signup = async (req, res) => {

    //initialize user
    const { name, email, password, phone_number, gender } = req.body;
    //find user
    const existingUser = await User.findOne({ where: { email } });

    //check if user already exists
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    //back-end field computation
    const hashedPassword = await bcrypt.hash(password, 10);
    const currentTime = new Date();
    const expiresAt = new Date(currentTime.getTime() + 5 * 60 * 1000);
    const otp = Math.floor(10000 + Math.random() * 90000);
    const hashedEmail = await bcrypt.hash(email, 10);
    const base64email = Buffer.from(hashedEmail).toString("base64");

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone_number,
        gender,
        created_at: currentTime,
        otp,
        otp_expires_at: expiresAt,
        remember_token: base64email
    });

    await user.save();

    // console.log("***************************************")
    // console.log("User created:", user);
    // console.log("***************************************")

    res.status(201).json({ message: "User created successfully" });
};


//otp-verification
exports.verifyOtp = async (req, res) => {

    //initialize user
    const { email, otp } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    //check user existence
    if (!existingUser) return res.status(404).json({ error: "User does not exist" });
    //otp-validity check
    if (new Date() > existingUser.otp_expires_at) return res.status(400).json({ error: "OTP has expired" });
    //otp-authentication
    if (existingUser.otp != otp) return res.status(400).json({ error: "Incorrect OTP" });

    //set email_verification time
    existingUser.email_verified_at = new Date();
    await existingUser.save();

    // console.log("***************************************")
    // console.log("OTP verified: USER: ", existingUser.email);
    // console.log("***************************************")

    res.status(201).json({ message: "Email verified successfully" });
};


//log-in
exports.login = async (req, res) => {

    //initialize user
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    //check user existence
    if (!user) return res.status(400).json({ error: "Invalid email or password" });
    //password-authentication
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid email or password" });

    //create jwt-token - 1hr validity
    const token = jwt.sign({ id: user.id, email: user.email, type: "user" }, process.env.HASH_KEY, { expiresIn: "1h" });

    // console.log("***************************************")
    // console.log("User login:", user)
    // console.log("***************************************")

    res.json({ token });
};


//fetches profile data
exports.getProfile = async (req, res) => {
    try {   

        if(user.type != "user") return res.status(404).json({ error: "Only users authorized"})

        //initialize user
        const user = await User.findByPk(req.user.id);
        //check user validity
        if (!user) return res.status(404).json({ error: "User not found" });

        // console.log("***************************************")
        // console.log("User profile-fetches: ", user.email)
        // console.log("***************************************")

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            gender: user.gender
        });
    } catch (err) {
        console.error("Profile error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

//edits user-fields
//does't edit email as its a unique field
exports.editProfile = async (req, res) => {
    try {

        //initialize user
        const user = await User.findByPk(req.user.id);
        //check user validity
        if (!user) return res.status(404).json({ error: "User not found" });

        const { name, email, password, phone_number, gender } = req.body;

        //checks whether the email provided is the same as the token's (just an extra layer of security)
        if(user.email != email) return res.status(404).json({ error: "Filed token/email match" });

        //editing user fields
        user.name = name;
        user.password = await bcrypt.hash(password, 10);
        user.phone_number = phone_number;
        user.gender = gender;
        user.updated_at = new Date();

        await user.save();

        // console.log("***************************************")
        // console.log("User-edited: ", user)
        // console.log("***************************************")

        res.status(201).json({ message: "User edited successfully" });
    } catch (err) {
        console.error("Edit error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
