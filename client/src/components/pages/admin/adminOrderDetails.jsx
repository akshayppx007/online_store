import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Col,
	Container,
	Row,
	Form,
	Alert,
	ListGroup,
	Button,
	Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailsAdmin, markAsDelivered } from "../../../actions/orderActions";
import Loader from "../../layouts/loader";

function AdminOrderDetails() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { loading, order, error } = useSelector((state) => state.orderDetails);

	const updateOrderToDelivered = (id) => {
		dispatch(markAsDelivered(id));
	};

	useEffect(() => {
		dispatch(getOrderDetailsAdmin(id));
	}, [dispatch, id]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container fluid>
					<Row className="mt-4">
						<h1>Order Details</h1>
						<Col md={8}>
							<Row className="mb-4">
								<Col md={6}>
									<h4>shipping</h4>
									<b>Name</b>: {order.user && order.user.firstName}{" "}
									{order.user && order.user.lastName}
									<br />
									<b>Address</b>: {order.user && order.user.address}
									<br />
									<b>Phone</b>: {order.user && order.user.phoneNumber}
									{order.isDelivered ? (
										<Alert variant="success" className="mt-2">
											Order deliverd
										</Alert>
									) : (
										<Alert variant="danger" className="mt-2">
											Order not deliverd
										</Alert>
									)}
								</Col>
								<Col md={6}>
									<h4>payment method</h4>
									<Form.Select disabled>
										<option value="">{order && order.paymentMethod}</option>
									</Form.Select>
									{order.isPaid ? (
										<Alert variant="success" className="mt-3">
											payed
										</Alert>
									) : (
										<Alert variant="danger" className="mt-3">
											payment not made
										</Alert>
									)}
								</Col>
							</Row>
							<h4>cart items</h4>
		{order.cartItems && order.cartItems.map((item, idx) => (
			
			<div key={idx}>
			<ListGroup.Item>
        <Row>
          <Col md={2}>
           <Image fluid crossOrigin="anonymous" src={item.image ? item.image.path ?? null : null}></Image>
          </Col>
          <Col md={3}>{item.name}</Col>
          <Col md={2}>{item.price}</Col>
          <Col md={3}>
            <Form.Select disabled>
              <option>{item.quantity}</option>
            </Form.Select>
          </Col>
          <Col md={2}>
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
	  </div>
		))}
						</Col>
					
						<Col md={4}>
							<ListGroup>
								<ListGroup.Item>
									<h4>Order Summery</h4>
								</ListGroup.Item>
								<ListGroup.Item>
									Product Price(after tax):{" "}
									<span className="fw-bold">
										${order.orderTotal && order.orderTotal.cartSubtotal}
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
										${order.orderTotal && order.orderTotal.cartSubtotal}
									</span>
								</ListGroup.Item>
								<ListGroup.Item className="text-danger">
									<div className="d-grid gap-2">
										{order.isDelivered ? (
											<Button type="button" variant="info" disabled>
												order delivered
											</Button>
										) : (
											<Button type="button" variant="info" onClick={() => updateOrderToDelivered(order._id)}>
												mark as delivered
											</Button>
										)}
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

export default AdminOrderDetails;
