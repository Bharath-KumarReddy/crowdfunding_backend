const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../model/user");

module.exports.signup = async (req, res) => {

    const { name, email, password, number } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            number
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({ token, status: true ,message: "User saved successfully"});

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", status: false });
    }
};

module.exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, status: true,message: "user logged in successfully"});

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", status: false });
    }
};
