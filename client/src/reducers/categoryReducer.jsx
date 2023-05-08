import {
	ALL_CATEGORY_REQUEST,
	ALL_CATEGORY_SUCCESS,
	ALL_CATEGORY_FAIL,
	CLEAR_ERRORS,
	SAVE_ATTR,
	INSERT_CATEGORY,
	DELETE_CATEGORY,
} from "../constants/categoryConstants";

export const categoryReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case ALL_CATEGORY_REQUEST:
			return {
				loading: true,
				categories: [],
			};

		case ALL_CATEGORY_SUCCESS:
			return {
				loading: false,
				categories: action.payload.categories,
			};
		case SAVE_ATTR:
			return {
				...state,
				categories: action.payload,
			};
		case INSERT_CATEGORY:
			return {
				...state,
				categories: action.payload,
			};
		case DELETE_CATEGORY:
			return {
				...state,
				categories: action.payload,
			};

		case ALL_CATEGORY_FAIL:
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
