const Category = require("../models/category");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// get all categories
exports.getCategories = catchAsyncErrors(async (req, res, next) => {
	const categories = await Category.find();

	res.status(200).json({
		success: true,
		categories,
	});
});

// create new category
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
	const { category } = req.body;
	if (!category) {
		next(new ErrorHandler("category name is required", 400));
	}
	const categoryExists = await Category.findOne({ name: category });
	if (categoryExists) {
		next(new ErrorHandler("category already exists", 400));
	} else {
		const categoryCreated = await Category.create({
			name: category,
		});
		res.status(201).json({ categoryCreated: categoryCreated });
	}
});

// delete category
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
	if(req.params.category !== "Choose category") {
		const categoryExists = await Category.findOne({
			name: decodeURIComponent(req.params.category)
		});

		if (!categoryExists) {
			return next(new ErrorHandler("category do not exist"));
		}
		await categoryExists.remove()
		res.status(200).json({categoryDeleted: true})
	} else {
		return next(new ErrorHandler("category do not exist"));
	}
});

// saving attributes to category
exports.saveAttr = catchAsyncErrors(async (req, res, next) => {
	const { key, val, categoryChoosen } = req.body;

	const category = categoryChoosen.split("/")[0];
	const categoryExists = await Category.findOne({ name: category });
	if (!categoryExists) {
		return next(new ErrorHandler("category do not exist"));
	}
	if (categoryExists.attrs.length > 0) {
		var keyDoesNotExistsInDatabase = true;
		categoryExists.attrs.map((item, idx) => {
			if (item.key === key) {
				keyDoesNotExistsInDatabase = false;
				var copyAttributeValues = [...categoryExists.attrs[idx].value];
				copyAttributeValues.push(val);
				var newAttributeValues = [...new Set(copyAttributeValues)];
				categoryExists.attrs[idx].value = newAttributeValues;
			}
		});

		if (keyDoesNotExistsInDatabase) {
			categoryExists.attrs.push({ key: key, value: [val] });
		}
	} else {
		categoryExists.attrs.push({ key: key, value: [val] });
	}
	await categoryExists.save();
	let cat = await Category.find({}).sort({ name: "asc" });
	return res.status(201).json({
		success: true,
		categoriesUpdated: cat,
	});
});
