const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("./jwt/auth")
const User = require("./sql/user")
const sequelize = require("./sql/db");

require('dotenv').config();

const app = express();
app.use(express.json());

//mysql connection [db: crm]
sequelize.sync().then(() => console.log("MySQL connected")).catch(console.error)


//sign-up
app.post("/signup", async (req, res) => {
    
    //initialize user
    const { name, email, password, age, phone_number, gender } = req.body
    //find user
    const existingUser = await User.findOne({ where: { email } })

    //check if user already exists
    if (existingUser)
        return res.status(400).json({ error: "User already exists" })

    //back-end field computation
    const hashedPassword = await bcrypt.hash(password, 10);
    const currentTime = new Date();
    const expiresAt = new Date(currentTime.getTime() + 5 * 60 * 1000)
    const otp = Math.floor(10000 + Math.random() * 90000);
    const hashed_email = await bcrypt.hash(email, 10)
    const base64email = Buffer.from(hashed_email).toString("base64");

    //create user
    const user = await User.create({
         name,
         email, 
         password: hashedPassword, 
         age, 
         phone_number, 
         gender, 
         created_at: currentTime, 
         otp, 
         otp_expires_at:expiresAt, 
         remember_token: base64email 
        })
    await user.save()

    console.log("User created: ", user )
    res.status(201).json({ message: "User created successfully" })
});


//otp-verification
app.post("/verify", async(req, res)=>{
    //initialize user
    const {email, otp} = req.body
    const existingUser = await User.findOne({ where: {email}})

    //check user existence
    if(!existingUser)
        return res.status(404).json({ error: "User does not exists" })
    //otp-validity check
    if (new Date() > existingUser.otp_expires_at) 
        return res.status(400).json({ error: "OTP has expired" });
    //otp-authentication
    if(existingUser.otp != otp)
        return res.status(400).json({ error: "Incorrect OTP"})

    //set email_verification time
    existingUser.email_verified_at = new Date();
    await existingUser.save()

    res.status(201).json({ message: "Email verifies successfully"})
})


//log-in
app.post("/login", async (req, res) => {

    //initialize user
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } })

    //check user existence
    if (!user)
        return res.status(400).json({ error: "Invalid username or password" })

    //password-authentication
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
        return res.status(400).json({ error: "Invalid username or password" })

    //create jwt-token - 1hr validity
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.HASH_KEY, { expiresIn: "1h" })

    console.log("User login: ", user)
    res.json({ token });
})


// uses jwt-middleware
//fetches profile data
app.get("/profile", auth, async (req, res) => {
    try {
        //initialize user
        const user = await User.findByPk(req.user.id)
        //check user validity
        if (!user) return res.status(404).json({ error: "User not found" })

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.age,
            phone_number: user.phone_number,
            gender: user.gender
        })
    } catch (err) {
        console.error("Profile error:", err)
        res.status(500).json({ error: "Internal server error" })
    }
})


//uses jat-middleware
//edits user-fields
app.post("/edit", auth, async(req, res)=>{
    try{
        //initialize user
        const user = await User.findByPk(req.user.id)
        //check user validity
        if(!user) return res.ststus(404).json({ error: "User not found" })

        const { name, email, password, age, phone_number, gender} = req.body

        //editing user fields
        user.name = name
        user.email = email
        user.password = await bcrypt.hash(password, 10)
        user.age = age
        user.phone_number = phone_number
        user.gender = gender
        user.updated_at = new Date()

        await user.save()

        res.status(201).json({ message: "User edited successfully"})
    }catch(err){
        console.error("Edit error: ",err)
        res.status(500).json({ error: "Internal server error"})
    }
})


const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))