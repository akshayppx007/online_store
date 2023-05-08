
import { useSelector } from "react-redux";
import axios from "axios";
import { loadScript } from "@paypal/paypal-js";
import UserOrderDetailsComponent from "./userOrderDetailsComponent";

const getOrder = async (orderId) => {
	let { data } = await axios.get("/api/user/order/" + orderId);
	data = data.order;
	return data;
};



const loadPayPalScript = (
	cartSubtotal,
	cartItems,
	orderId,
	updateStateAfterOrder
) => {
	loadScript({
		"client-id":
			"AXokBwGjm0JoBwiXvwVSFMS5JK3a57Rx7WG4KMNxm5n9qvqsfI5iRGOuzFW6fDYAl8ONQIZ--dmpWJMy",
	})
		.then((paypal) => {
			paypal
				.Buttons(
					buttons(cartSubtotal, cartItems, orderId, updateStateAfterOrder)
				)
				.render("#paypal-container-element");
		})
		.catch((err) => {
			console.error("failed to load the PayPal JS SDK script", err);
		});
};

const buttons = (cartSubtotal, cartItems, orderId, updateStateAfterOrder) => {
	return {
		createOrder: function (data, actions) {
			return actions.order.create({
				purchase_units: [
					{
						amount: {
							value: cartSubtotal,
							breakdown: {
								item_total: {
									currency_code: "USD",
									value: cartSubtotal,
								},
							},
						},
						items: cartItems.map((product) => {
							return {
								name: product.name,
								unit_amount: {
									currency_code: "USD",
									value: product.price,
								},
								quantity: product.quantity,
							};
						}),
					},
				],
			});
		},
		onCancel: onCancelHandler,
		onApprove: function (data, actions) {
			return actions.order.capture().then(function (orderData) {
				var transaction = orderData.purchase_units[0].payments.captures[0];
				if (
					transaction.status === "COMPLETED" &&
					Number(transaction.amount.value) === Number(cartSubtotal)
				) {
					updateOrder(orderId)
						.then((data) => {
							if (data.isPaid) {
								updateStateAfterOrder(data.paidAt);
							}
						})
						.catch((er) => console.log(er));
				}
			});
		},
		onError: onErrorHandler,
	};
};

const onCancelHandler = function () {
	console.log("cancel");
};

const onErrorHandler = function (err) {
	console.log("error");
};

const updateOrder = async (orderId) => {
	let { data } = await axios.put("/api/user/order/paymentsuccess/" + orderId);
	data = data.order;
	return data;
};

const UserOrderDetails = () => {
	const { user } = useSelector((state) => state.persistReducer.loginUser);

	const getUser = async () => {
		let { data } = await axios.get("/api/user/profile/" + user._id);
		data = data.user;
		return data;
	};

	return (
		<UserOrderDetailsComponent
			getUser={getUser}
			getOrder={getOrder}
			loadPayPalScript={loadPayPalScript}
		/>
	);
};

export default UserOrderDetails;
