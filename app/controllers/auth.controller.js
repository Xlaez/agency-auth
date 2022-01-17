const User = require('../models/user.model')
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

getToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username}, config.secret, {
        expiresIn: 86400
    })
}

const signup = async(req, res) => {
    const newUser = await User.findOne({
        email: req.body.email
    })

    if(newUser){
        res.status(401).send({message: 'user already exists'})
        return
    }

    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    try{
        user.save()

        var token = getToken(user)

        res.status(200).send({
            id: user._id,
            email: user.email,
            username: user.username,
            accessToken: token
        })
    }
    catch(e){
        res.status(400).send({success: false, data: e})
    }
};

const signin = async(req, res) => {

    const currentUser = await User.findOne({
        email: req.body.email
    })

    if(!currentUser){
        return res.status(404).send({ message: 'User does not exist'})
    }

    var passwordIsValid = bcrypt.compareSync(
        req.body.password, currentUser.password
    )

    if(!passwordIsValid){
        return res.status(401).send({
            accessToken: null,
            message: 'Invalid password'
        })
    }

    var token = getToken(currentUser)

    res.status(200).send({
        id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        accessToken: token
    })
}

module.exports = {
    signup,
    signin
}