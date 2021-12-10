const mongoose = require("mongoose")

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {type: String, required:[true, 'enter a valid username']},
        fullname: {type: String, required:[true, 'enter a fullname']},
        email: {type: String, required:[true, 'enter an email ']},
        password: {type: String, required:[true, 'enter a password ']},

        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    })
)

module.exports = User