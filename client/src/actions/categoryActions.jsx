import axios from "axios";
import {
	ALL_CATEGORY_REQUEST,
	ALL_CATEGORY_SUCCESS,
	ALL_CATEGORY_FAIL,
	CLEAR_ERRORS,
} from "../constants/categoryConstants";

// Get all categories
export const getCategories = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_CATEGORY_REQUEST });

		const { data } = await axios.get(`/api/categories`);
		dispatch({
			type: ALL_CATEGORY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_CATEGORY_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Save attribute to category document
export const saveAttributeToCatDoc =
	(key, val, categoryChoosen) => async (dispatch, getState) => {
		const { data } = await axios.post("/api/category/attributes/add", {
			key,
			val,
			categoryChoosen,
		});
		if (data.categoryUpdated) {
			dispatch({
				type: actionTypes.SAVE_ATTR,
				payload: [...data.categoryUpdated],
			});
		}
	};

// Create new category
export const newCategory = (category) => async (dispatch, getState) => {
	const cat = getState().getCategories.categories;
	const { data } = await axios.post("/api/category/create", { category });
	if (data.categoryCreated) {
		dispatch({
			type: actionTypes.INSERT_CATEGORY,
			payload: [...cat, data.categoryCreated],
		});
	}
};

// Delete category
export const deleteCategory = (category) => async (dispatch, getState) => {
	const cat = getState().getCategories.categories;
	const categories = cat.filter((item) => item.name !== category);
	const { data } = await axios.delete(
		"/api/category/delete/" + encodeURIComponent(category)
	);
	if (data.categoryDeleted) {
		dispatch({
			type: actionTypes.DELETE_CATEGORY,
			payload: [...categories],
		});
	}
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
