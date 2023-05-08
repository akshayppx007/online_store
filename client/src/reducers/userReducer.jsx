import {
	ALL_USER_REQUEST,
	ALL_USER_SUCCESS,
	ALL_USER_FAIL,
	CLEAR_ERRORS,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_REQUEST_ADMIN,
	USER_UPDATE_SUCCESS_ADMIN,
	USER_UPDATE_FAIL_ADMIN,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_RESET,
	ADD_REVIEW_REQUEST,
	ADD_REVIEW_SUCCESS,
	ADD_REVIEW_FAIL,
	ADD_REVIEW_RESET,
	USER_DETAILS_RESET,
	USER_UPDATE_RESET_ADMIN,
	USER_DETAILS_REQUEST_ADMIN,
	USER_DETAILS_SUCCESS_ADMIN,
	USER_DETAILS_FAIL_ADMIN,
} from "../constants/userConstants";

export const loginUserReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
		case REGISTER_REQUEST:
		case USER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
		case USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				token: action.payload.token,
				user: action.payload.user,
			};
		case LOGOUT_SUCCESS:
			return {
				loading: false,
				isAuthenticated: false,
				user: null,
			};
		case LOGOUT_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};
		case USER_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};
		case USER_DETAILS_RESET:
			return {
				...state,
				loading: false,
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				token: null,
				user: null,
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

export const userReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case ALL_USER_REQUEST:
			return {
				loading: true,
				users: [],
			};
		case ALL_USER_SUCCESS:
			return {
				loading: false,
				users: action.payload.users,
			};
		case ALL_USER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case USER_DELETE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_DELETE_SUCCESS:
			return {
				...state,
				loading: false,
				users: state.users.filter((user) => user._id !== action.payload),
			};
		case USER_DELETE_FAIL:
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

export const userUpdateReducerAdmin = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST_ADMIN:
		case USER_DETAILS_REQUEST_ADMIN:
			return {
				...state,
				loading: true,
				user: {},
			};
		case USER_UPDATE_SUCCESS_ADMIN:
			return {
				...state,
				loading: false,
				isUpdated: action.payload.success,
				user: action.payload.user,
			};
		case USER_DETAILS_SUCCESS_ADMIN:
			return {
				...state,
				loading: false,
				user: action.payload.user,
			};
		case USER_UPDATE_RESET_ADMIN:
			return {
				...state,
				isUpdated: false,
			};
		case USER_UPDATE_FAIL_ADMIN:
		case USER_DETAILS_FAIL_ADMIN:
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

export const userProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};
		case UPDATE_PROFILE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case UPDATE_PROFILE_RESET:
			return {
				...state,
				isUpdated: false,
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

export const userReviewsReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ADD_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};
		case ADD_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case ADD_REVIEW_RESET:
			return {
				...state,
				isUpdated: false,
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
