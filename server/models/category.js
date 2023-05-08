const mongoose = require("mongoose");
const { schema } = require("./product");

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			default: "category description",
		},
		image: {
			type: String,
			default: "https://rb.gy/05t6",
		},
		attrs: [
			{
				key: {
					type: String,
				},
				value: [
					{
						type: String,
					},
				],
			},
		],
	},
	{
		timestamps: true,
	}
);

categorySchema.index({ description: 1 });
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
