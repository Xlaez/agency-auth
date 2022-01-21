const {Resource} = require("../models/user.model");

const getResources = async(req, res) => {
    const resources = await Resource.find();
    res.status(200).json({ success: true, data: resources})
}

const getSingleResource = async(req, res) => {
    const { id } = req.params;

    const resource = await Resource.findOne({ _id: id });
    res.status(200).json({ success: true, data: resource});
}

const createResource = (req, res) => {
    const body = req.body;

    const resource = new Resource({
        ...body, 
        user: req.userId,
    })
    let error = resource.validateSync();
    if(error){
        return res.status(400).json({ success: false, message: 'failed to create' })
    }

    resource.save();

    res.status(201).json({ success: true, resource: resource})
}

const deleteResource = async(req, res) => {
    const {id} = req.params;
    
    await Resource.findByIdAndDelete({ _id: id})
        .catch(e => {
        console.log(e)
        return res.status(400).json({ success: false, message: 'failed to delete resource'})
    })
    res.status(200).json({ success: true, message: 'resource deleted successfully'})
};

module.exports = {
    createResource,
    getResources,
    getSingleResource,
    deleteResource,
}