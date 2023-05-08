import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layouts/footer";
import Header from "./layouts/header";
import Admin from "./pages/admin/admin";
import AdminAnalytics from "./pages/admin/adminAnalytics";
import AdminChat from "./pages/admin/adminChat";
import AdminCreateProduct from "./pages/admin/adminCreateProduct";
import AdminEditProduct from "./pages/admin/adminEditProduct";
import AdminEditUser from "./pages/admin/adminEditUser";
import AdminOrderDetails from "./pages/admin/adminOrderDetails";
import AdminOrders from "./pages/admin/adminOrders";
import AdminProducts from "./pages/admin/adminProducts";
import Cart from "./pages/cart";
import Home from "./pages/home";
import Login from "./pages/login";
import ProductDetails from "./pages/productDetails";
import ProductList from "./pages/productList";
import Registration from "./pages/registration";
import UserCart from "./pages/user/userCartDetails";
import UserOrderDetails from "./pages/user/userOrderDetails";
import UserOrders from "./pages/user/userOrders";
import UserProfile from "./pages/user/userProfile";
import UserChatRoutes from "./routeConfig/userChatRoutes";
import ScrollTop from "./utils/scrollTop";
import store from "../store";
import { getUserProfile } from "../actions/userActions";
import { useDispatch } from "react-redux";
import NoPage from "./pages/noPage";
import ProtectedRoutes from "./routeConfig/protectedRoutes";

function App() {
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	store.dispatch(getUserProfile());
	// }, [dispatch]);

	return (
		<>
			<Router>
				<ScrollTop />
				<Header />
				<Routes>
					<Route path="*" element={<NoPage />} />
					<Route element={<UserChatRoutes />}>
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/register" element={<Registration />} />
						<Route path="/login" element={<Login />} />
						<Route path="/product-list" element={<ProductList />} />
						<Route
							path="/product-list/:pageNumParam"
							element={<ProductList />}
						/>
						<Route
							path="/product-list/category/:categoryName"
							element={<ProductList />}
						/>
						<Route
							path="/product-list/category/:categoryName/:pageNumParam"
							element={<ProductList />}
						/>
						<Route
							path="/product-list/search/:searchQuery"
							element={<ProductList />}
						/>
						<Route
							path="/product-list/search/:searchQuery/:pageNumParam"
							element={<ProductList />}
						/>
						<Route
							path="/product-list/category/:categoryName/search/:searchQuery"
							element={<ProductList />}
						/>
						<Route
							path="/product-list/category/:categoryName/search/:searchQuery/:pageNumParam"
							element={<ProductList />}
						/>
						<Route path="/product/:id" element={<ProductDetails />} />
						<Route element={<ProtectedRoutes admin={false} />}>
							<Route path="/user/:id" element={<UserProfile />} />
							<Route path="/user/:id/orders" element={<UserOrders />} />
							<Route path="/user/order/:id" element={<UserOrderDetails />} />
							<Route path="/user/:id/cart/details" element={<UserCart />} />
						</Route>
					</Route>

					<Route element={<ProtectedRoutes admin={true} />}>
						<Route path="/admin" element={<Admin />} />
						<Route path="/admin/orders" element={<AdminOrders />} />
						<Route path="/admin/order/:id" element={<AdminOrderDetails />} />
						<Route path="/admin/analytics" element={<AdminAnalytics />} />
						<Route path="/admin/chat" element={<AdminChat />} />
						<Route
							path="/admin/:id/product/create"
							element={<AdminCreateProduct />}
						/>
						<Route path="/admin/user/:id" element={<AdminEditUser />} />
						<Route path="/admin/product/:id" element={<AdminEditProduct />} />
						<Route path="/admin/products/" element={<AdminProducts />} />
					</Route>
				</Routes>

				<Footer />
			</Router>
		</>
	);
}

export default App;
