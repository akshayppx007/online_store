import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinks from "../../layouts/adminLayout/adminLinks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrdersAdmin } from "../../../actions/orderActions";
import Loader from "../../layouts/loader";

function AdminOrders() {
	const dispatch = useDispatch();

	const { loading, error, orders } = useSelector((state) => state.orders);

	useEffect(() => {
		dispatch(getOrdersAdmin());
	}, [dispatch]);

	return (
		<>
			{" "}
			{loading ? (
				<Loader />
			) : (
				<Container>
					<Row className="mt-4">
						<Col md={2}>
							<AdminLinks />
						</Col>
						<Col md={10}>
							<h1>Order details</h1>
							<Table striped bordered hover responsive>
								<thead>
									<tr>
										<th>#</th>
										<th>Users</th>
										<th>Date</th>
										<th>Total</th>
										<th>Deliverd</th>
										<th>Payment Method</th>
										<th>Order Details</th>
									</tr>
								</thead>
								<tbody>
                {orders.map((order, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
                    <td>{order && order.user && order.user.firstName} {order && order.user && order.user.lastName}</td>
										<td>{new Date(order.createdAt).toLocaleDateString("en-GB")}</td>
										<td>{order.orderTotal.cartSubtotal}</td>
										<td>
                    {order.isDelivered ? ( <i className="bi bi-check-lg text-success"></i> ) : ( <i className="bi bi-x-lg text-danger"></i> )}
										</td>
										<td>{order.paymentMethod}</td>
										<td>
											<Link to={`/admin/order/${order._id}`}>link to</Link>
										</td>
									</tr>
                ))}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
}

export default AdminOrders;
