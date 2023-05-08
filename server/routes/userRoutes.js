const express = require("express");
const {
	getUsers,
	registerUser,
	loginUser,
	logoutUser,
	updateUser,
	getUserDetails,
	userReview,
	getUserProfile,
	updateUserProfile,
    deleteUser,
	getUserProfileLogin
} = require("../controllers/userController");
const { isAuthenticatedUser, veryfyAdmin } = require("../middlewares/auth");
const router = express.Router();

// admin routes
router.route("/admin/users").get(isAuthenticatedUser, veryfyAdmin, getUsers);
router.route("/admin/user/:id")
	.get(isAuthenticatedUser, veryfyAdmin, getUserProfile)
	.put(isAuthenticatedUser, veryfyAdmin, updateUserProfile)
    .delete(isAuthenticatedUser, veryfyAdmin, deleteUser);


router.route("/user/new").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/logout").get(logoutUser);
router.route("/user/me").get(isAuthenticatedUser, getUserProfileLogin);
router.route("/user/me/update").put(isAuthenticatedUser, updateUser);
router.route("/user/profile/:id").get(isAuthenticatedUser, getUserDetails);
router.route("/user/product/review/:productId")
	.post(isAuthenticatedUser, userReview);

module.exports = router;
