import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	CLEAR_ERRORS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	DELETE_PRODUCT_RESET,
	GET_BEST_PRODUCTS_REQUEST,
	GET_BEST_PRODUCTS_SUCCESS,
	GET_BEST_PRODUCTS_FAIL,
} from "../constants/productConstants.jsx";

export const productReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case ALL_PRODUCTS_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case ALL_PRODUCTS_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
			};
		case ALL_PRODUCTS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				product: {},
			};
		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload.product,
			};

		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const deleteProductReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_PRODUCT_REQUEST:
			return {
				loading: true,
			};
		case DELETE_PRODUCT_SUCCESS:
			return {
				loading: false,
				isDeleted: true,
			};
		case DELETE_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case DELETE_PRODUCT_RESET:
			return {
				...state,
				isDeleted: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const bestProductsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case GET_BEST_PRODUCTS_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case GET_BEST_PRODUCTS_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};
		case GET_BEST_PRODUCTS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
