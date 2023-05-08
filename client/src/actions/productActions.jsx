import axios from "axios";
import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	CLEAR_ERRORS,
	DELETE_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	GET_BEST_PRODUCTS_REQUEST,
	GET_BEST_PRODUCTS_SUCCESS,
	GET_BEST_PRODUCTS_FAIL,
} from "../constants/productConstants";

// get poducts for admin
export const getProductsAdmin = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_PRODUCTS_REQUEST });

		const { data } = await axios.get(`/api/admin/products`);

		dispatch({
			type: ALL_PRODUCTS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_PRODUCTS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// get product details
export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/product/${id}`);

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

//  get best selling products
export const getBestProducts = () => async (dispatch) => {
	try {
		dispatch({ type: GET_BEST_PRODUCTS_REQUEST });

		const { data } = await axios.get(`/api/products/best_sellers`);

		dispatch({
			type: GET_BEST_PRODUCTS_SUCCESS,
			payload: data.product,
		});

		dispatch({
			type: CLEAR_ERRORS,
		});
	} catch (error) {
		dispatch({
			type: GET_BEST_PRODUCTS_FAIL,
			payload: error.response.data.message,
		});
	}
};


// delete product
export const deleteProduct = (id) => async (dispatch) => {
	try {

		dispatch({ type: DELETE_PRODUCT_REQUEST });
		
		await axios.delete(`/api/admin/product/${id}`);

		dispatch({
			type: DELETE_PRODUCT_SUCCESS,
			payload: id,
		});


		dispatch({
			type: CLEAR_ERRORS,
		});
	} catch (error) {
		dispatch({
			type: DELETE_PRODUCT_FAIL,
			payload: error.response.data.message,
		});
	}
};


// clear errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
