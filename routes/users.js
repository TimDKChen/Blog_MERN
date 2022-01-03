const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const helper = require("../helper");

// GET ALL USERS
// GET ALL USERS' EMAIL
router.get("/emails", async (_req, res) => {
    try {
        const emails = await helper.getAllEmails();
        res.status(200).json(emails);
    } catch (err) {
        res.status(500).json(err);
    };
});

// GET ONE USER DETAILS
router.get("/:id", async (req, res) => {
    try {
        // 1. check authorization
        const authorization = req.header('Authorization');
        const token = authorization.replace('Bearer ', '');
        const email = helper.getEmailFromToken(token);
        const emails = await helper.getAllEmails();
        // 2. get user's detail
        if (emails.includes(email)) {
            const user = await User.findById(req.params.id);
            const { password, __v, sessionActive, timestamps, ...others } = user._doc;
            res.status(200).json(others);
            return;
        } else {
            res.status(400).send({ error: "Invalid input!" });
            return;
        };
    } catch (err) {
        res.status(403).send({ error: "Token not found!" });
        return;
    }
});

// DELETE (Admin)
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        try {
            await Post.remove({ username: user.username });
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted!");
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(404).json({ error: "User not found" });
    };
});

// UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.userId && req.body.password && req.body.userId === req.params.id) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        try {
            // findByIdAndUpdate(id, update, options, callback)
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedUser);
            return;
        } catch (err) {
            res.status(500).send({ error: "Server error!" });
            return;
        };
    } else {
        res.status(400).send({ error: "Invalid input!" });
        return;
    };
});

module.exports = router;