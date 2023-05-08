const express = require("express");
const { getCategories, createCategory, deleteCategory, saveAttr } = require("../controllers/categoryController");
const router = express.Router();


router.route("/categories").get(getCategories);
router.route("/category/create").post(createCategory);
router.route("/category/delete/:id").post(deleteCategory);
router.route("/category/attributes/add").put(saveAttr);


module.exports = router;