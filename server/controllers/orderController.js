const Order = require("../models/order");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");

// Get user orders
exports.getUserOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find({ user: req.user.id });
	if (!orders) {
		return next(new ErrorHandler("No orders found", 404));
	}

	res.status(200).json({
		success: true,
		orders,
	});
});

// get order details
exports.getOrderDetails = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"-password -isAdmin -_id -__v -createdAt -updatedAt"
	);
	if (!order) {
		return next(new ErrorHandler("No order found", 404));
	}

	res.status(200).json({
		success: true,
		order,
	});
});

// create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
	const { cartItems, orderTotal, paymentMethod } = req.body;
	if (!cartItems || !orderTotal || !paymentMethod) {
		return next(new ErrorHandler("All inputs are required", 400));
	}

	let ids = cartItems.map((item) => {
		return item.productID;
	});
	let qty = cartItems.map((item) => {
		return Number(item.quantity);
	});

	await Product.find({ _id: { $in: ids } }).then((products) => {
		products.forEach(function (product, idx) {
			product.sales += qty[idx];
			product.save();
		});
	});

	const order = new Order({
		user: req.user.id,
		orderTotal: orderTotal,
		cartItems: cartItems,
		paymentMethod: paymentMethod,
	});
	await order.save();
	res.status(201).json({
		success: true,
		message: "Order created successfully",
		order,
	});
});

// update order to paid
exports.updateOrderToPaid = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	if (!order) {
		return next(new ErrorHandler("No order found", 404));
	}

	order.isPaid = true;
	order.paidAt = Date.now();
	await order.save();

	res.status(200).json({
		success: true,
		message: "Order paid successfully",
	});
});

// update order to delivered
exports.updateOrderToDelivered = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	if (!order) {
		return next(new ErrorHandler("No order found", 404));
	}

	order.isDelivered = true;
	order.deliveredAt = Date.now();
	await order.save();

	res.status(200).json({
		success: true,
		message: "Order delivered successfully",
	});
});

// admin routes
// get all orders -> admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find()
		.populate("user", "-password")
		.sort({ paymentMethod: "desc" });
	if (!orders) {
		return next(new ErrorHandler("No orders found", 404));
	}

	res.status(200).json({
		success: true,
		orders,
	});
});

// get order for analytics
exports.getOrderAnalytics = catchAsyncErrors(async (req, res, next) => {
	const start = new Date(req.params.date);
	start.setHours(0, 0, 0, 0);
	const end = new Date(req.params.date);
	end.setHours(23, 59, 59, 999);

	const orders = await Order.find({
		createdAt: {
			$gte: start,
			$lte: end,
		},
	}).sort({ createdAt: "asc" });

	if (!orders) {
		return next(new ErrorHandler("No orders found", 404));
	}

	res.send(orders);
});
