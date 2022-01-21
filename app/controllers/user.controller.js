const {User} = require("../models/user.model");


const getUsers = async(req, res) => {
    const user = await User.find();
    res.status(200).json({ success: true, data: user });
};

const getSingleUser = async(req, res) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });
    res.status(200).json({ success: true, data: user });
};


const createUser = (req, res) => {
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

const editUser = async(req, res) => {
    const { id } = req.params;
    const body = req.body;

    const user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true }).catch(e => {
        console.log(e)
        return res.status(400).json({ success: false, msg: "failed to update" });
    })

    res.status(200).json({ success: true, data: user });
};

module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    editUser,
}