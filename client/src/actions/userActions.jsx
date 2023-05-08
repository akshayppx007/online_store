import axios from "axios";
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
	LOGOUT_REQUEST,
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
	ADD_REVIEW_REQUEST,
	ADD_REVIEW_SUCCESS,
	ADD_REVIEW_FAIL,
	USER_DETAILS_REQUEST_ADMIN,
	USER_DETAILS_SUCCESS_ADMIN,
	USER_DETAILS_FAIL_ADMIN,
} from "../constants/userConstants";

// get users for admin
export const getUsersAdmin = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_USER_REQUEST });

		const { data } = await axios.get(`/api/admin/users`);
		dispatch({
			type: ALL_USER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// delete user for admin
export const deleteUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST });

		await axios.delete(`/api/admin/user/${id}`);
		dispatch({
			type: USER_DELETE_SUCCESS,
			payload: id,
		});
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// get user details for admin
export const getUserDetailsAdmin = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST_ADMIN });

		const { data } = await axios.get(`/api/admin/user/${id}`);

		dispatch({
			type: USER_DETAILS_SUCCESS_ADMIN,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL_ADMIN,
			payload: error.response.data.message,
		});
	}
};

// update user for admin
export const updateUserAdmin = (id, userData) => async (dispatch) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST_ADMIN });

		const { data } = await axios.put(`/api/admin/user/${id}`, userData);
		dispatch({
			type: USER_UPDATE_SUCCESS_ADMIN,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL_ADMIN,
			payload: error.response.data.message,
		});
	}
};

// login user
export const loginUsers = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		};

		const { data } = await axios.post(
			`/api/user/login`,
			{
				email,
				password,
			},
			config
		);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.message,
		});
	}
};

// logout user
export const logoutUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOGOUT_REQUEST });

		await axios.get(`/api/user/logout`);

		dispatch({
			type: LOGOUT_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: LOGOUT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// register user
export const registerUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			withCredentials: true,
		};

		const { data } = await await axios.post(`/api/user/new`, userData, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: REGISTER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// update user details
export const updateUserDetails = (userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROFILE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			withCredentials: true,
		};

		const { data } = await axios.put(`/api/user/me/update`, userData, config);
		dispatch({
			type: UPDATE_PROFILE_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// get user Profile
export const getUserProfile = () => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/user/me`);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// add review
export const addReview = (id, reviewData) => async (dispatch) => {
	try {
		dispatch({ type: ADD_REVIEW_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			`/api/user/product/review/${id}`,
			reviewData,
			config
		);

		dispatch({
			type: ADD_REVIEW_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: ADD_REVIEW_FAIL,
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
