const mongoose = require("mongoose");

const getNowTime = () => {
    const date = new Date();
    return date.toISOString();
};

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    profilePic: {
        type: String,
        required: false,
        default: "defaultAvatar.png"
    },
    sessionActive: {
        type: Boolean,
        default: false,
        required: false
    },
    timestamps: {
        type: String,
        default: getNowTime()
    }
});

module.exports = mongoose.model("User", UserSchema);