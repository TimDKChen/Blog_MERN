const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const helper = require("../helper");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const email = req.body.email;
        const newEmail = await User.findOne({ email });
        if (newEmail) {
            res.status(400).send({ error: "Invalid input!" });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        // save user info
        await newUser.save();
        res.status(200).json({ success: "Register successful!" });
        return;
    } catch (err) {
        res.status(500).send({ error: "Server error!" });
        return;
    };
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        // 1.check user if exists
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send({ error: "Invalid input!" });
            return;
        } else {
            // 2.check password
            const validated = await bcrypt.compare(req.body.password, user.password);
            if (!validated) {
                res.status(400).send({ error: "Invalid input!" });
                return;
            }
        };
        // 3. update state
        await User.where({ email }).updateOne({ sessionActive: true });
        // 4. get token
        const token = helper.getTokenFromEmail(email);
        const { password, __v, sessionActive, timestamps, ...others } = user._doc;
        const userWithToken = { token, ...others };
        // 5. send res
        res.status(200).json(userWithToken);
    } catch (err) {
        res.status(500).send({ error: "Server error!" });
        return;
    };
});

// GOOGLE-LOGIN
router.post("/google-login", async (req, res) => {
    try {
        // 1. check user if exists
        const email = req.body.email;
        const token = helper.getTokenFromEmail(email);
        const user = await User.findOne({ email });
        if (!user) {
            // 2. save google user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                profilePic: req.body.profilePic,
                sessionActive: true 
            });
            await newUser.save();
            const response = { token, ...req.body };
            res.status(200).json(response);
            return;
        } else {
            const { password, __v, sessionActive, timestamps, ...others } = user._doc;
            const response = { token, ...others };
            res.status(200).json(response);
            return;
        }
    } catch (err) {
        res.status(400).send({ error: "Invalid input!" });
        return;
    };
});

// LOGOUT
router.post("/logout", async (req, res) => {
    try {
        const email = req.body.email;
        await User.findOneAndUpdate({ email }, { sessionActive: false });
        res.status(200).send({});
        return;
    } catch (err) {
        res.status(500).send({ error: "Server error!" });
        return;
    };
});
module.exports = router;