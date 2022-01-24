const {Category} = require("../models/user.model");

const getCategories = (req, res) => {
    res.status(200).json({ message: 'get all categories' })
};

const createCategory = (req, res) => {
    res.status(200).json({ messge: 'create a category' })
};

const editCategory = (req, res) => {
    res.status(200).json({ message: 'update a category'})
};

const deleteCategory = (req, res) => {
    res.status(200).json({ message: 'delete a category' })
};

module.exports = {
    getCategories,
    createCategory,
    editCategory,
    deleteCategory,
}