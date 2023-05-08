import { combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
	userProfileReducer,
	userReducer,
	userReviewsReducer,
	userUpdateReducerAdmin,
} from "./reducers/userReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import {
	bestProductsReducer,
	deleteProductReducer,
	productDetailsReducer,
	productReducer,
} from "./reducers/productReducer";
import {
	orderDetailsReducer,
	orderDetailsUserReducer,
	orderReducer,
	userOrderReducer,
} from "./reducers/orderReducer";
import persistedReducer from "./utils/persistedReducers";
import { adminChatReducer } from "./reducers/chatReducer";
// import { FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE } from "redux-persist";

const reducer = combineReducers({
	users: userReducer,
	categories: categoryReducer,
	products: productReducer,
	orders: orderReducer,
	orderDetails: orderDetailsReducer,
	persistReducer: persistedReducer,
	userProfile: userProfileReducer,
	userOrders: userOrderReducer,
	userOrderDetails: orderDetailsUserReducer,
	productDetails: productDetailsReducer,
	addReviews: userReviewsReducer,
	userAdmin: userUpdateReducerAdmin,
	deleteProduct: deleteProductReducer,
	bestSellers: bestProductsReducer,
	adminChat: adminChatReducer,
});



let initialState = {
};

// const middleware = [thunk];


const store = configureStore({
	reducer: reducer,
	devTools: true,
    preloadedState: initialState,
	// composeWithDevTools(applyMiddleware(middleware)),
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
	  immutableStateInvariantCheck: false,
    }).concat(thunkMiddleware),
});

export default store;
