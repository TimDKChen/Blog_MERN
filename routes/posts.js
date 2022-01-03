const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const helper = require("../helper.js");

// CREATE POST
router.post("/", async (req, res) => {
    try {
        // 1. check authorization
        const authorization = req.header('Authorization');
        const token = authorization.replace('Bearer ', '');
        const email = helper.getEmailFromToken(token);
        const emails = await helper.getAllEmails();
        const newPost = new Post(req.body);
        if (emails.includes(email)) {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
            return;
        };
        res.status(400).send({ error: "Invalid input!" });
        return;
    } catch (err) {
        res.status(403).send({ error: "Token not found!" });
        return;
    }
});

// GET ONE POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).select(' -__v');
        res.status(200).json(post);
    } catch (err) {
        res.status(403).send({ error: "Post id not found!" });;
    }
});

// GET ALL POSTS by default or username or catName
// do not write 400
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find().select(' -__v');
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).send({ error: "Server error!" });
    };
});

// UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        // 1. check authorization
        const authorization = req.header('Authorization');
        const token = authorization.replace('Bearer ', '');
        const email = helper.getEmailFromToken(token);
        const emails = await helper.getAllEmails();
        const post = await Post.findById(req.params.id);
        if (emails.includes(email) && post.username === req.body.username) {
            // The $set operator replaces the value of a field
            // with the specified value (from Monogoose)
            await Post.findByIdAndUpdate(
                req.params.id, 
                { $set: req.body },
                { new: true }
            );
            res.status(200).send({ success: "Post has been updated!" });
            return; 
        };
        res.status(400).send({ error: "Invalid input!" });
        return;
    } catch (err) {
        res.status(403).send({ error: "Token or Id not found!" });
        return;
    }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        // 1. check authorization
        const authorization = req.header('Authorization');
        const token = authorization.replace('Bearer ', '');
        const email = helper.getEmailFromToken(token);
        const emails = await helper.getAllEmails();
        const post = await Post.findById(req.params.id);
        if (emails.includes(email)) {
            await post.remove();
            res.status(200).send({ success: "Post has been deleted!" });
            return;
        } 
        res.status(400).send({ error: "Invalid input!" });
        return;
    } catch (err) {
        res.status(403).send({ error: "Token or Id not found!" });
    };
});

module.exports = router;