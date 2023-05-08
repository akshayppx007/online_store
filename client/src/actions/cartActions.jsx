import axios from "axios";
import { ADD_TO_CART, REMOVE_ITEM_CART } from "../constants/cartConstants";

// Add to cart
export const addToCart = (id, quantity, price) => async (dispatch) => {
	const { data } = await axios.get(`/api/product/${id}`);

	dispatch({
		type: ADD_TO_CART,
		payload: {
			productID: data.product._id,
			name: data.product.name,
			image: data.product.images[0].path,
			price: data.product.price,
			count: data.product.count,
			quantity,
		},
	});

};


// Remove from cart
export const removeFromCart = (productID) => (dispatch) => {
	dispatch({
		type: REMOVE_ITEM_CART,
		payload: productID,
	});
};
