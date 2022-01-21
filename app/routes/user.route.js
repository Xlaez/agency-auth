
const express = require('express')
const router = express.Router()

const {
    getUsers,
    getSingleUser,
    createUser,
    editUser,
} =  require("../controllers/user.controller");

router.route('/api/all/user').get(getUsers)
router.route('/api/user/:id').get(getSingleUser).put(editUser)
router.route('/api/user').post(createUser)

module.exports = router