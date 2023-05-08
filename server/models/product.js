const mongoose = require("mongoose");
const Review = require("./review");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "please enter product name"],
		},
		description: {
			type: String,
			required: [true, "please enter a decription"],
		},
		price: {
			type: String,
			required: [true, "please enter a price for the product"],
			maxLength: [6, "price cannot be greater than 6 figures"],
		},
		rating: {
			type: Number,
			default: 0,
		},
		category: {
			type: String,
			required: true,
		},
		count: {
			type: Number,
			required: [true, "please enter the product stock"],
			default: 1,
		},
		reviewsNumber: {
			type: Number,
		},
		sales: {
			type: Number,
			default: 0,
		},
		attrs: [{ key: { type: String }, value: [{ type: String }] }],
		images: [{path: {
			type: String,
			required: true,
		}}],
		reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: Review }],
	},
	{ timestamps: true }
);


productSchema.index(
	{ name: "text", description: "text" },
	{ name: "textIndex" }
);
productSchema.index({ "attrs.key": 1, "attrs.value": 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
