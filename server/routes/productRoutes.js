const express = require("express");
const { getAllProducts, getProduct, getBestSellers, getAdminProducts, createProduct, deleteProduct, updateProduct, uploadProductImages, deleteProductImage, adminGetProduct } = require("../controllers/productController");
const { getUsers } = require("../controllers/userController");
const { isAuthenticatedUser, veryfyAdmin } = require("../middlewares/auth");
const router = express.Router();


// common routes
router.route("/products/category/:categoryName/search/:searchQuery").get(getAllProducts);
router.route("/products/category/:categoryName").get(getAllProducts);
router.get("/products", getAllProducts);
router.route("/products/search/:searchQuery").get(getAllProducts);
router.route("/product/:id").get(getProduct);
router.route("/products/best_sellers").get(getBestSellers);


// admin routes             
router.route("/admin/products").get(isAuthenticatedUser, veryfyAdmin, getAdminProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, veryfyAdmin, createProduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser, veryfyAdmin, deleteProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, veryfyAdmin, updateProduct);
router.route("/admin/product/:id").get(isAuthenticatedUser, veryfyAdmin, adminGetProduct);
router.route("/admin/product/images/new").post(isAuthenticatedUser, veryfyAdmin, uploadProductImages);
router.route("/admin/product/image/:imagePath/:productId").delete(isAuthenticatedUser, veryfyAdmin, deleteProductImage);



module.exports = router;


