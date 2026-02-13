const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ✅ REGISTER USER (Admin will use this)
exports.registerUser = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        // check if user exists
        const exists = await User.findOne({ email });

        if (exists) {
            return res.status(400).json("User already exists");
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json("User created successfully");

    } catch (err) {
        res.status(500).json(err.message);
    }
};



// ✅ LOGIN USER
exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
            return res.status(401).json("Invalid credentials");

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(401).json("Invalid credentials");

        // create token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            role: user.role
        });

    } catch (err) {
        res.status(500).json(err.message);
    }
};
