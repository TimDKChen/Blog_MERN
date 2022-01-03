const jwt = require("jsonwebtoken");
const User = require("./models/User");

// KEY
const JWT_SECRET = 'giraffegiraffebeetroot';

const getAllEmails = async () => {
    const users = await User.find().select('email -_id');
    let usersEmails = [];
    // get all emails in []
    // console.log(users.length);
    for (let i = 0; i < users.length; i++) {
        usersEmails.push(users[i].email);
    }
    // console.log(usersEmails);
    return usersEmails;
};

const getTokenFromEmail = (email) => {
    // shortcut for email in {}
    const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
    return token;
};

const getEmailFromToken = (token) => {
    const { email } = jwt.verify(token, JWT_SECRET);
    return email;
};

module.exports = { getAllEmails, getEmailFromToken, getTokenFromEmail };