const mongoose = require("mongoose");
const User = require("./user");

const reviewSchema = mongoose.Schema(
	{
		comment: { type: String, required: true },
		rating: { type: Number, required: true },
		user: {
			_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
			name: { type: String, required: true },
		},
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
