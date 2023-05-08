import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layouts/loader";
import { getOrders } from "../../../actions/orderActions";

function UserOrders() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { loading, error, orders } = useSelector((state) => state.userOrders);

	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container>
					<Row>
						<Col md={12}>
							<h1>Order details</h1>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>User</th>
										<th>Date</th>
										<th>Total</th>
										<th>Deliverd</th>
										<th>Order Details</th>
									</tr>
								</thead>
								<tbody>
									{orders &&
										orders.map((order, idx) => (
											<tr key={idx}>
												<td>{idx + 1}</td>
												<td>
													me
												</td>
												<td>{order.createdAt}</td>
												<td>{order.orderTotal.cartSubtotal}</td>
												<td>
													{order.isDelivered ? (
														<i className="bi bi-check-lg text-success"></i>
													) : (
														<i className="bi bi-x-lg text-danger"></i>
													)}
												</td>
												<td>
													<Link to={`/user/order/${order._id}`}>link to</Link>
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

export default UserOrders;
