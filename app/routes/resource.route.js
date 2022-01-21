const express = require('express')
const router = express.Router()

const {
    createResource,
    getResources,
    getSingleResource,
    deleteResource,
} = require("../controllers/resource.controller")

router.route('/create').post(createResource)
router.route('/all').get(getResources)
router.route('/:id').get(getSingleResource).delete(deleteResource)

module.exports = router