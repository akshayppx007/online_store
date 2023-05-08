import React, { useEffect, useState } from "react";
import {
	Col,
	Container,
	Row,
	Form,
	CloseButton,
	Button,
	Table,
	Image,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	updateUserAdmin,
	getUsersAdmin,
	getUserDetailsAdmin,
} from "../../../actions/userActions";
import Loader from "../../layouts/loader";
import { toast } from "react-toastify";
import { USER_UPDATE_RESET_ADMIN } from "../../../constants/userConstants";

function AdminEditUser() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isUpdated, loading } = useSelector((state) => state.userAdmin);

	const [validated, setValidated] = useState(false);
	const [firstName, setFirstName] = useState(user.firstName || "");
	const [lastName, setLastName] = useState(user.lastName || "");
	const [email, setEmail] = useState(user.email || "");
	const [isAdmin, setIsAdmin] = useState(user.isAdmin || false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.preventDefault();
			dispatch(updateUserAdmin(id, { firstName, lastName, email, isAdmin }));
		}

		setValidated(true);
	};

	useEffect(() => {
		dispatch(getUserDetailsAdmin(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (isUpdated) {
			navigate("/admin");
			toast.success("User updated successfully");
		}

		dispatch({ type: USER_UPDATE_RESET_ADMIN });
	}, [isUpdated, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container>
					<Row className="mt-5 justify-content-md-center">
						<Col md={1}>
							<Link to={"/admin"} className="btn btn-info">
								<i className="bi bi-arrow-left"></i>
							</Link>
						</Col>

						<Col md={6}>
							<h1>Edit User</h1>

							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group controlId="firstName_id">
									<Form.Label>First Name</Form.Label>
									<Form.Control
										name="firstName"
										type="text"
										defaultValue={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</Form.Group>
								<Form.Group controlId="lastName_id" className="mt-3">
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										name="lastName"
										type="text"
										defaultValue={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</Form.Group>
								<Form.Group controlId="email_id" className="mt-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										name="email"
										type="Email"
										defaultValue={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<Form.Control.Feedback type="invalid">
										Please enter a valid email id
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Check
									type="checkbox"
									id={"adminCheckbox"}
									label={"is Admin"}
									checked={isAdmin}
									onChange={(e) => setIsAdmin(e.target.checked)}
									className="mt-3"
								/>

								<Button type="submit" variant="primary" className="mt-3">
									Update
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
}

export default AdminEditUser;
