const { Category } = require("../models/user.model");

const getCategories = async (req, res) => {
  const category = await Category.find();
  if (category === null) {
    return res.status(400).json({ message: "There is no category to display" });
  }
  try {
    res.status(200).json({ message: "get all categories", data: category });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const createCategory = async (req, res) => {
  const body = req.body;
  try {
    const category = new Category({
      ...body,
    });
    category = await category.save().then((result) => {
      return res
        .status(200)
        .json({ messge: "create a category", data: category });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const editCategory = async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "id doesn't meet required criteria" });
  }
  await Category.findByIdAndUpdate(id, body);
  try {
    return res.status(200).json({ message: "update a category" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  try {
    return res
      .status(200)
      .json({ message: "delete a category", data: category });
  } catch (err) {
    return res
      .status(400)
      .json({ mesage: "Couldn't delete category", status: "Fail" });
  }
};

module.exports = {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
};
