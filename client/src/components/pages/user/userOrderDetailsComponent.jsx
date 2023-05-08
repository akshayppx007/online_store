import React, { useEffect, useRef, useState } from "react";
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
import { getOrderDetails } from "../../../actions/orderActions";
import Loader from "../../layouts/loader";
import OrderItems from "../../layouts/userlayout/orderItems";
import { loadScript } from "@paypal/paypal-js";
import { toast } from "react-toastify";

function UserOrderDetailsComponent({ getUser, getOrder, loadPayPalScript }) {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { order, loading, error } = useSelector(
		(state) => state.userOrderDetails
	);
	const { user } = useSelector((state) => state.persistReducer.loginUser);
	const [paymentStatus, setPaymentStatus] = useState(order.isPaid);
	const [deliveryStatus, setDeliveryStatus] = useState(order.isDelivered);
	const [cartItems, setCartItems] = useState(order.cartItems);
	const [cartSubtotal, setCartSubtotal] = useState(order.cartSubtotal);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [cod, setCod] = useState(false);
	const [isPaid, setIsPaid] = useState(order.paidAt);
	const [isDelivered, setIsDelivered] = useState(order.deliveredAt);
	const [paymentMethod, setPaymentMethod] = useState(order.paymentMethod);
	const [orderButtonMessage, setOrderButtonMessage] = useState("make payment");
	const paypalContainer = useRef();

	useEffect(() => {
		dispatch(getOrderDetails(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (order) {
			setPaymentStatus(order.isPaid);
			setDeliveryStatus(order.isDelivered);
			setCartItems(order.cartItems);
			setCartSubtotal(order.cartSubtotal);
			setIsPaid(order.paidAt);
		}
	}, [order]);

	
	useEffect(() => {
		getUser()
		  .then((data) => {
			setUserAddress({
			  address: data.address,
			  city: data.city,
			  country: data.country,
			  zipCode: data.zipCode,
			  state: data.state,
			  phoneNumber: data.phoneNumber,
			});
		  })
		  .catch((err) => console.log(err));
	  }, []);
	
	  useEffect(() => {
		getOrder(id)
		  .then((data) => {
			setPaymentMethod(data.paymentMethod);
			setCartItems(data.cartItems);
			setCartSubtotal(data.orderTotal.cartSubtotal);
			data.isDelivered
			  ? setIsDelivered(data.deliveredAt)
			  : setIsDelivered(false);
			data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
			if (data.isPaid) {
			  setButtonDisabled(true);
			  setPaymentStatus(true);
			  toast.success("Order paid");
			} else {
			  if (data.paymentMethod === "pp") {
				setOrderButtonMessage("Pay for your order");
			  } else if (data.paymentMethod === "cod") {
				setButtonDisabled(true);
				setOrderButtonMessage("Wait for your order. You pay on delivery");
			  }
			}
		  })
		  .catch((err) => console.log(err));
	  }, []);

	const handlePayment = () => {
		setButtonDisabled(true);
		if (order.paymentMethod === "PayPal") {
			if (!order.isPaid) {
				loadPayPalScript(cartSubtotal, cartItems, id, updateStateAfterOrder);
			} else {
				alert("Order already paid");
			}
		}
	};

	const updateStateAfterOrder = (paidAt) => {
		setIsPaid(paidAt);
		setButtonDisabled(true);
		paypalContainer.current.style = "display: none";
	};

	useEffect(() => {
		if (order.paymentMethod === "cod") {
			setCod(true);
			setButtonDisabled(true);
		}
	}, [order]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container fluid>
					<Row className="mt-4">
						<h1>Order Details</h1>
						<Col md={8}>
							<Row>
								<Col md={6}>
									<h4>shipping</h4>
									<b>Name</b>: {user.firstName} {user.lastName}
									<br />
									<b>Address</b>: {user.address}
									<br />
									<b>Phone</b>: {user.phoneNumber}
									<Alert
										variant="danger"
										className="mt-2"
										show={!deliveryStatus}
									>
										Order not deliverd
									</Alert>
									<Alert
										variant="success"
										className="mt-2"
										show={deliveryStatus}
									>
										Order deliverd
									</Alert>
								</Col>
								<Col md={6}>
									<h4>payment method</h4>
									<Form.Select disabled={true}>
										<option value={order.paymentMethod}>
											{order.paymentMethod}
										</option>
									</Form.Select>
									<Alert variant="success" className="mt-3" show={cod}>
										order placed, pay when you get your order
									</Alert>
									<Alert
										variant="success"
										className="mt-3"
										show={paymentStatus}
									>
										payed
									</Alert>
								</Col>
							</Row>
							<Row className="mt-4">
								<h4 className="mb-2">Order Items</h4>
								<ListGroup variant="flush">
									{cartItems &&
										cartItems.map((item, idx) => (
											<OrderItems key={idx} item={item} />
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
									<span className="fw-bold">
										$
										{order && order.orderTotal && order.orderTotal.cartSubtotal}
									</span>
								</ListGroup.Item>
								<ListGroup.Item>
									Shipping: <span className="fw-bold">free</span>
								</ListGroup.Item>
								<ListGroup.Item>
									tax: <span className="fw-bold">included</span>
								</ListGroup.Item>
								<ListGroup.Item className="text-danger">
									Total:{" "}
									<span className="fw-bold">
										$
										{order && order.orderTotal && order.orderTotal.cartSubtotal}
									</span>
								</ListGroup.Item>
								<ListGroup.Item className="text-danger">
									<div className="d-grid gap-2">
										<Button
											type="button"
											variant="info"
											onClick={handlePayment}
											disabled={buttonDisabled}
										>
											{orderButtonMessage}
										</Button>
									</div>

								
								</ListGroup.Item>
							</ListGroup>
						</Col>
						
					</Row>
					<div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
										<div
											ref={paypalContainer}
											id="paypal-container-element"
										></div>
									</div>
				</Container>
			)}
		</>
	);
}

export default UserOrderDetailsComponent;
