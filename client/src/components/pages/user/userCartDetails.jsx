import React, { useEffect, useState } from "react";
import {
	Col,
	Container,
	Row,
	Form,
	Alert,
	ListGroup,
	Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import CartItemsComponent from "../../layouts/userlayout/cartItems";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../actions/cartActions";
import { getUserProfile } from "../../../actions/userActions";
import { USER_DETAILS_RESET } from "../../../constants/userConstants";
import { createOrder } from "../../../actions/orderActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CREATE_ORDER_RESET } from "../../../constants/orderConstant";
import Loader from "../../layouts/loader";

function UserCart() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cartItems, cartSubtotal, itemsCount } = useSelector(
		(state) => state.persistReducer.cart
	);
	const { user } = useSelector((state) => state.persistReducer.loginUser);
	const { order, isUpdated, loading } = useSelector(
		(state) => state.userOrderDetails
	);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [alert, setAlert] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("cod");

	const addToCartHandler = (id, qty) => {
		dispatch(addToCart(id, qty));
	};

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const paymentMethodHandler = (e) => {
		setPaymentMethod(e.target.value);
	};

	const orderHandler = () => {
		const orderData = {
			cartItems: cartItems.map((item) => {
				return {
					productID: item.productID,
					name: item.name,
					price: item.price,
					image: { path: item.image },
					quantity: item.quantity,
					count: item.count,
				};
			}),
			orderTotal: {
				itemsCount: itemsCount,
				cartSubtotal: cartSubtotal,
			},
			paymentMethod: paymentMethod,
		};
		console.log(orderData);

		dispatch(createOrder(orderData));
	};

	useEffect(() => {
		if (isUpdated) {
			toast.success("Order Placed Successfully");
			navigate(`/user/order/${order._id}`);
		}

		dispatch({ type: CREATE_ORDER_RESET });
	}, [isUpdated, navigate, order]);

	useEffect(() => {
		dispatch(getUserProfile());
	}, [dispatch]);

	useEffect(() => {
		if (
			!user.address ||
			!user.phoneNumber ||
			!user.pinCode ||
			!user.city ||
			!user.state
		) {
			setButtonDisabled(true);
			setAlert(true);
		} else {
			setButtonDisabled(false);
			setAlert(false);
		}
		dispatch({ type: USER_DETAILS_RESET });
	}, [user, dispatch]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container fluid>
					<Row className="mt-4">
						<h1>Cart Details</h1>
						<Col md={8}>
							<Row>
								<Col md={6}>
									<h4>shipping</h4>
									<b>Name</b>: {user.firstName} {user.lastName}
									<br />
									<b>Address</b>: {user.address}
									<br />
									<b>Phone</b>: {user.phoneNumber}
									<Alert variant="warning" className="mt-2" show={alert}>
										please add your address
									</Alert>
								</Col>
								<Col md={6}>
									<h4>payment method</h4>
									<Form.Select onChange={paymentMethodHandler}>
										<option value="cod">Pay on delivery</option>
										<option value="PayPal">Paypal</option>
									</Form.Select>
									<Alert variant="danger" className="mt-3" show={false}>
										payment not made
									</Alert>
									<Alert variant="success" className="mt-3" show={false}>
										payed
									</Alert>
								</Col>
							</Row>
							<Row className="mt-4">
								<h4 className="mb-2">Order Items</h4>
								<ListGroup variant="flush">
									{cartItems.map((item, idx) => (
										<CartItemsComponent
											key={idx}
											item={item}
											addToCartHandler={addToCartHandler}
											removeFromCartHandler={removeFromCartHandler}
										/>
									))}
								</ListGroup>
							</Row>
						</Col>
						<Col md={4}>
							<ListGroup>
								<ListGroup.Item>
									<h4>Order Summery</h4>
								</ListGroup.Item>
								<ListGroup.Item>
									Product Price(after tax):{" "}
									<span className="fw-bold">${cartSubtotal}</span>
								</ListGroup.Item>
								<ListGroup.Item>
									Shipping: <span className="fw-bold">free</span>
								</ListGroup.Item>
								<ListGroup.Item>
									tax: <span className="fw-bold">included</span>
								</ListGroup.Item>
								<ListGroup.Item className="text-danger">
									Total: <span className="fw-bold">${cartSubtotal}</span>
								</ListGroup.Item>
								<ListGroup.Item className="text-danger">
									<div className="d-grid gap-2">
										<Button
											type="button"
											variant="info"
											disabled={buttonDisabled}
											onClick={orderHandler}
										>
											Place Order
										</Button>
									</div>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
}

export default UserCart;
