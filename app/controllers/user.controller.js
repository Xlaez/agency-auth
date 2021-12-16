const User = require("../models/user.model");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.getUser = async(req, res) => {
    const user = await User.find();
    res.status(200).json({ success: true, data: user });
};

exports.getSingleUser = async(req, res) => {
    const { id } = req.params;

    const user = await User.find({ _id: id });
    res.status(200).json({ success: true, data: user });
};


exports.createUser = (req, res) => {
    const body = req.body;
    console.log(body);

    const user = new User({
        ...body,
    });
    let error = user.validateSync();
    console.log(error)
    if (error) {
        return res.status(400).json({ success: false, msg: "failed" });
    }
    user.save();

    res.status(201).json({ success: true, user: user });
};

exports.editUser = async(req, res) => {
    const { id } = req.params;
    const body = req.body;

    const user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true }).catch(e => {
        console.log(e)
        return res.status(400).json({ success: false, msg: "failed to update" });
    })

    res.status(200).json({ success: true, data: user });
};