import axios from "axios";
import {
	ALL_ORDERS_REQUEST_ADMIN,
	ALL_ORDERS_SUCCESS_ADMIN,
	ALL_ORDERS_FAIL_ADMIN,
	CLEAR_ERRORS,
	ORDER_DETAILS_REQUEST_ADMIN,
	ORDER_DETAILS_SUCCESS_ADMIN,
	ORDER_DETAILS_FAIL_ADMIN,
	MARK_DELIVERD_REQUEST_ADMIN,
	MARK_DELIVERD_SUCCESS_ADMIN,
	MARK_DELIVERD_FAIL_ADMIN,
	ALL_ORDERS_REQUEST,
	ALL_ORDERS_SUCCESS,
	ALL_ORDERS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
} from "../constants/orderConstant";

// get orders for admin
export const getOrdersAdmin = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_ORDERS_REQUEST_ADMIN });

		const { data } = await axios.get(`/api/admin/orders`);

		dispatch({
			type: ALL_ORDERS_SUCCESS_ADMIN,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_ORDERS_FAIL_ADMIN,
			payload: error.response.data.message,
		});
	}
};

// get order details for admin
export const getOrderDetailsAdmin = (id) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST_ADMIN });

		const { data } = await axios.get(`/api/user/order/${id}`);

		dispatch({
			type: ORDER_DETAILS_SUCCESS_ADMIN,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL_ADMIN,
			payload: error.response.data.message,
		});
	}
};

// mark order as delivered for admin
export const markAsDelivered = (id) => async (dispatch) => {
	try {
		dispatch({ type: MARK_DELIVERD_REQUEST_ADMIN });

		const { data } = await axios.put(`/api/admin/order/deliveryStatus/${id}`);

		dispatch({
			type: MARK_DELIVERD_SUCCESS_ADMIN,
			payload: data.success,
		});
		dispatch(getOrderDetailsAdmin(id));
	} catch (error) {
		dispatch({
			type: MARK_DELIVERD_FAIL_ADMIN,
			payload: error.response.data.message,
		});
	}
};


// get orders for user
export const getOrders = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_ORDERS_REQUEST });

		const { data } = await axios.get(`/api/user/orders`);

		dispatch({
			type: ALL_ORDERS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_ORDERS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// get order details for user
export const getOrderDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/user/order/${id}`);

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};


// create order
export const createOrder = (order) => async (dispatch) => {
	try {
		dispatch({ type: CREATE_ORDER_REQUEST });


		const { data } = await axios.post(`/api/user/order/new`, order);

		dispatch({
			type: CREATE_ORDER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CREATE_ORDER_FAIL,
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
