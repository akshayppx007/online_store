import { ADD_TO_CART, REMOVE_ITEM_CART, CHANGE_QUANTITY_CART } from "../constants/cartConstants";



export const cartReducer = (state = { cartItems: [], cartSubtotal: 0, itemsCount: 0 }, action) => {
	switch (action.type) {
	  case ADD_TO_CART:
		const item = action.payload;
		const isItemExist = state.cartItems.find((i) => i.productID === item.productID);
		if (isItemExist) {
		  return {
			...state,
			cartItems: state.cartItems.map((i) => (i.productID === isItemExist.productID ? item : i)),
			cartSubtotal: state.cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
			itemsCount: state.cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
		  };
		} else {
		  return {
			...state,
			cartItems: [...state.cartItems, item],
			cartSubtotal: state.cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, item.price * item.quantity),
			itemsCount: state.cartItems.reduce((acc, curr) => acc + curr.quantity, item.quantity)
		  };
		}
	  case REMOVE_ITEM_CART:
		const filteredCartItems = state.cartItems.filter((i) => i.productID !== action.payload);
		return {
		  ...state,
		  cartItems: filteredCartItems,
		  cartSubtotal: filteredCartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
		  itemsCount: filteredCartItems.reduce((acc, curr) => acc + curr.quantity, 0)
		};
	  default:
		return state;
	}
  };
  


// export const cartReducer = (
// 	state = { cartItems: [], itemsCount: 0, cartSubtotal: 0 },
// 	action
//   ) => {
// 	switch (action.type) {
// 	  case ADD_TO_CART:
// 		const item = action.payload;
// 		const isItemExist = state.cartItems.find(
// 		  (i) => i.productID === item.productID
// 		);
// 		if (isItemExist) {
// 		  return {
// 			...state,
// 			cartItems: state.cartItems.map((i) =>
// 			  i.productID === isItemExist.productID ? item : i
// 			),
// 		  };
// 		} else {
// 		  return {
// 			...state,
// 			cartItems: [...state.cartItems, item],
// 		  };
// 		}
// 	  case REMOVE_ITEM_CART:
// 		return {
// 		  ...state,
// 		  cartItems: state.cartItems.filter(
// 			(i) => i.productID !== action.payload.productID
// 		  ),
// 		};
// 	  case CHANGE_QUANTITY_CART:
// 		return {
// 		  ...state,
// 		  cartItems: state.cartItems.map((item) =>
// 			item.productID === action.payload.productID
// 			  ? {
// 				  ...item,
// 				  quantity: action.payload.quantity,
// 				}
// 			  : item
// 		  ),
// 		};
// 	  default:
// 		const itemsCount = state.cartItems.reduce(
// 		  (count, item) => count + item.quantity,
// 		  0
// 		);
// 		const cartSubtotal = state.cartItems.reduce(
// 		  (subtotal, item) => subtotal + item.price * item.quantity,
// 		  0
// 		);
// 		return {
// 		  ...state,
// 		  itemsCount,
// 		  cartSubtotal,
// 		};
// 	}
//   };
  