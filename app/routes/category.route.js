const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.route("/").get(getCategories);
router.route("/create").post(createCategory);
router.route("/:id").put(editCategory).delete(deleteCategory);

module.exports = router;
