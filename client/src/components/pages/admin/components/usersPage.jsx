import { Col, Container, Row, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinks from "../../../layouts/adminLayout/adminLinks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAdmin, deleteUser } from "../../../../actions/userActions";
import Loader from "../../../layouts/loader";

function UsersPage() {
	const deleteHandler = (id) => {
		if (window.confirm("are you sure?")) {
			dispatch(deleteUser(id));
		}
	};

	const dispatch = useDispatch();

	const { loading, users, error } = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(getUsersAdmin());
	}, [dispatch]);

	

	return (
		<>
		 {loading ? <Loader /> : <Container>
				<Row className="mt-4">
					<Col md={2}>
						<AdminLinks />
					</Col>
					<Col md={10}>
						<h1>Users</h1>

						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>#</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Email</th>
									<th>isAdmin</th>
									<th>Edit/Delete</th>
								</tr>
							</thead>
							<tbody>
								{users &&
									users.map((user, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{user.firstName}</td>
											<td>{user.lastName}</td>
											<td>{user.email}</td>
											<td>
												{user.isAdmin ? (
													<i className="bi bi-check-lg text-success"></i>
												) : (
													<i className="bi bi-x-lg text-danger"></i>
												)}
											</td>
											<td>
												<LinkContainer to= {`/admin/user/${user._id}`}>
													<Button
														type="button"
														variant="primary"
														className="me-2"
													>
														<i className="bi bi-pencil-square"></i>
													</Button>
												</LinkContainer>
												<Button
													type="button"
													variant="danger"
													onClick={() => deleteHandler(user._id)}
												>
													<i className="bi bi-trash-fill"></i>
												</Button>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container> }
		</>
	);
}

export default UsersPage;
