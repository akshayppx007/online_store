const Product = require("../models/product");
const Review = require("../models/review");
const User = require("../models/user");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const mongoose = require("mongoose");

// register a new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
		return next(new ErrorHandler("Please enter all fields", 400));
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		return next(new ErrorHandler("User already exists", 400));
	}

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
	});

	sendToken(user, 200, res);
});

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler("Please enter email and password", 400));
	}

	const user = await User.findOne({ email });

	if (!user) {
		return next(new ErrorHandler("Invalid email or password", 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid Email or Password", 401));
	}
	sendToken(user, 200, res);
});

// logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
		path: "/",
	});

	res.status(200).json({
		success: true,
		message: "Logged out",
	});
});

// update user profile
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
	const {
		firstName,
		lastName,
		email,
		password,
		phoneNumber,
		state,
		city,
		address,
		pinCode,
	} = req.body;

	let user = await User.findById(req.user.id);

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	user = await User.findByIdAndUpdate(
		req.user.id,
		{
			firstName,
			lastName,
			email,
			password,
			phoneNumber,
			state,
			city,
			address,
			pinCode,
		},
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		success: true,
		message: "Profile updated successfully",
	});
});

// get user profile
exports.getUserProfileLogin = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// create review
exports.userReview = catchAsyncErrors(async (req, res, next) => {
	const session = await Review.startSession();

	try {
		const { comment, rating } = req.body;

		if (!comment || !rating) {
			return next(new ErrorHandler("Please enter comment and rating", 400));
		}

		const ObjectId = mongoose.Types.ObjectId;
		let reviewId = new ObjectId();
		session.startTransaction();

		const review = await Review.create({
			_id: reviewId,
			comment,
			rating: Number(rating),
			user: {
				_id: req.user.id,
				name: req.user.firstName + " " + req.user.lastName,
			},
		});

		const product = await Product.findById(req.params.productId)
			.populate("reviews")
			.session(session);

		const alreadyReviewed = product.reviews.find(
			(r) => r.user._id.toString() === req.user._id.toString()
		);
		if (alreadyReviewed) {
			await session.abortTransaction();
			session.endSession();
			return next(
				new ErrorHandler("You have already reviewed this product", 400)
			);
		}

		let prv = [...product.reviews];
		prv.push({ rating: rating });
		product.reviews.push(reviewId);
		if (product.reviews.length === 1) {
			product.rating = Number(rating);
			product.reviewsNumber = 1;
		} else {
			product.reviewsNumber = product.reviews.length;
			product.rating =
				prv
					.map((item) => Number(item.rating))
					.reduce((sum, item) => sum + item, 0) / product.reviews.length;
		}
		await product.save();

		await session.commitTransaction();
		session.endSession();

		res.status(200).json({
			success: true,
			message: "Review added successfully",
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
});

// admin routes
// get all users -> Admin
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find().select("-password");

	res.status(200).json({
		success: true,
		users,
	});
});

// get user details -> Admin
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id).select(
		"firstName lastName email isAdmin"
	);

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// update user profile -> Admin
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
	const { firstName, lastName, email, isAdmin } = req.body;

	let user = await User.findById(req.params.id);

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	user = await User.findByIdAndUpdate(
		req.params.id,
		{
			firstName,
			lastName,
			email,
			isAdmin,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
		user,
	});
});

// delete user -> Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	let user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	user = await User.findByIdAndDelete(req.params.id);

	res.status(200).json({
		success: true,
		message: "User deleted successfully",
	});
});
