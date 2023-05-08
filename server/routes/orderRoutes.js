const express = require("express");
const { getUserOrders, newOrder, getOrderDetails, updateOrderToPaid, updateOrderToDelivered, getAllOrders, getOrderAnalytics } = require("../controllers/orderController");
const { isAuthenticatedUser, veryfyAdmin } = require("../middlewares/auth");
const router = express.Router();


router.route("/user/orders").get( isAuthenticatedUser, getUserOrders);
router.route("/user/order/new").post(isAuthenticatedUser, newOrder);
router.route("/user/order/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/user/order/paymentsuccess/:id").put(isAuthenticatedUser, updateOrderToPaid);


// admin routes
router.route("/admin/orders").get(isAuthenticatedUser, veryfyAdmin, getAllOrders);
router.route("/admin/order/deliveryStatus/:id").put(isAuthenticatedUser, veryfyAdmin, updateOrderToDelivered);
router.route("/admin/order/analytics/:date").get(isAuthenticatedUser, veryfyAdmin, getOrderAnalytics);



module.exports = router;