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
	CREATE_ORDER_RESET,
} from "../constants/orderConstant";

export const orderReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ALL_ORDERS_REQUEST_ADMIN:
			return {
				loading: true,
				orders: [],
			};
		case ALL_ORDERS_SUCCESS_ADMIN:
			return {
				loading: false,
				orders: action.payload.orders,
			};
		case ALL_ORDERS_FAIL_ADMIN:
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

export const orderDetailsReducer = (state = { order: {} }, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST_ADMIN:
			return {
				loading: true,
				order: {},
			};
		case ORDER_DETAILS_SUCCESS_ADMIN:
			return {
				loading: false,
				order: action.payload.order,
			};
		case ORDER_DETAILS_FAIL_ADMIN:
			return {
				loading: false,
				error: action.payload,
			};
		case MARK_DELIVERD_REQUEST_ADMIN:
			return {
				...state,
				loading: true,
			};
		case MARK_DELIVERD_SUCCESS_ADMIN:
			return {
				...state,
				loading: false,
			};
		case MARK_DELIVERD_FAIL_ADMIN:
			return {
				...state,
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

export const userOrderReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ALL_ORDERS_REQUEST:
			return {
				loading: true,
				orders: [],
			};
		case ALL_ORDERS_SUCCESS:
			return {
				loading: false,
				orders: action.payload.orders,
			};
		case ALL_ORDERS_FAIL:
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

export const orderDetailsUserReducer = (state = { order: {} }, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
		case CREATE_ORDER_REQUEST:
			return {
				loading: true,
				order: {},
			};
		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload.order,
			};
		case CREATE_ORDER_SUCCESS:
			return {
				loading: false,
				isUpdated: action.payload.success,
				order: action.payload.order,
			};
		case CREATE_ORDER_RESET:
			return {
				...state,
				isUpdated: false,
			};
		case ORDER_DETAILS_FAIL:
		case CREATE_ORDER_FAIL:
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


