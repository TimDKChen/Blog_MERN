const mongoose = require("mongoose");

const getNowTime = () => {
    const date = new Date();
    return date.toISOString();
};

const PostSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    categories: {
        type: Array,
        required: false
    },
    timestamps: {
        type: String,
        default: getNowTime()
    }
});

module.exports = mongoose.model("Post", PostSchema);