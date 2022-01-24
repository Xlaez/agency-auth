const mongoose = require("mongoose")

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: { type: String, required: [true, 'enter a valid username'] },
        fullname: { type: String, required: [true, 'enter a fullname'] },
        email: { type: String, required: [true, 'enter an email '] },
        password: { type: String, required: [true, 'enter a password '] },
        phoneNumber: { type: String },
        primaryTeam: { type: String },
        dateOfBirth: { type: String },
        resumptionDate: { type: String },
        role: { type: String },
        team: { type: String },

        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    })
)

const Resource = mongoose.model(
    "Resource",
    new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        title: { type: String },
        url: { type: String },
        description: { type: String },
        type: { type: String },
    },
    {
        timestamps: true,
    })
)

const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        resource: {type: mongoose.Schema.Types.ObjectId, ref: 'Resource'},
        title: { type: String }
    })
)

module.exports = {
    User,
    Resource,
    Category,
}