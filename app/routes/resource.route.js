const express = require('express')
const router = express.Router()

const {
    createResource,
    getResources,
    getSingleResource,
    deleteResource,
    getUserResources,
} = require("../controllers/resource.controller")

router.route('/create').post(createResource)
router.route('/all').get(getResources)
router.route('/user').get(getUserResources)
router.route('/:id').get(getSingleResource).delete(deleteResource)

module.exports = router