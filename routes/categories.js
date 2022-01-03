const router = require("express").Router();
const Category = require("../models/Category");
const helper = require("../helper");

// CREATE NEW CATEGORY
router.post("/", async (req, res) => {
    const newCat = new Category(req.body);
    // 1. check authorization
    const authorization = req.header('Authorization');
    const token = authorization.replace('Bearer ', '');
    const email = helper.getEmailFromToken(token);
    const emails = await helper.getAllEmails();
    if (emails.includes(email)) {
        try {
            await newCat.save();
            res.status(200).send({ success: "Category has been created!" });
            return;
        } catch (err) {
            res.status(400).send({ error: "Invalid input!" });
            return;
        };
    }
    res.status(400).send({ error: "Invalid input!" });
    return;
});

// GET ALL CATEGORY
router.get("/", async (_req, res) => {
    try {
        const cats = await Category.find().select('-__v -timestamps');
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).send({ error: "Server error!" });
    };
});

// DELETE CATEGORY
router.delete("/:id", async (req, res) => {
    // 1. check authorization
    const authorization = req.header('Authorization');
    const token = authorization.replace('Bearer ', '');
    const email = helper.getEmailFromToken(token);
    const emails = await helper.getAllEmails();
    if (emails.includes(email) && req.params.id.length === 24) {
        const cat = await Category.findById(req.params.id);
        if (cat) {
            await cat.remove();
            res.status(200).json({ success: "Category has been deleted!" });
            return;
        } else {
            res.status(400).send({ error: "Invalid input!" });
            return;
        };
    } else {
        res.status(400).send({ error: "Invalid input!" });
        return;
    };
});
module.exports = router;