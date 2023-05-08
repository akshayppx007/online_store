import React, { useEffect, useState } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Spinner,
	Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors } from "../../actions/userActions";

function Registration() {
	const [validated, setValidated] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, user, isAuthenticated } = useSelector(
		(state) => state.persistReducer.loginUser
	);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
			toast.success("registration successful");
		}
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, isAuthenticated, error, navigate]);
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			const formData = new FormData();
			formData.set("firstName", event.target.firstName.value);
			formData.set("lastName", event.target.lastName.value);
			formData.set("email", event.target.email.value);
			formData.set("password", event.target.password.value);
			dispatch(registerUser(formData));
		}
		setValidated(true);
	};


	const onChange = (e) => {
		const password = e.target.form.querySelector("input[name=password]");
		const confirmPassword = e.target.form.querySelector(
			"input[name=confirmPassword]"
		);

		if (password.value === confirmPassword.value) {
			confirmPassword.setCustomValidity("");
		} else {
			confirmPassword.setCustomValidity("passwords don't match");
		}
	};


	return (
		<>
			<Container>
				<Row className="mt-5 justify-content-md-center">
					<Col md={6}>
						<h1>Register</h1>
						<Form
							noValidate
							validated={validated}
							onSubmit={handleSubmit}
							encType="multipart/form-data"
						>
							<Form.Group controlId="validationCustom01">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									name="firstName"
									required
									type="text"
									placeholder="first name"
									onChange={onChange}
								/>
								<Form.Control.Feedback type="invalid">
									Please enter Your Name
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="validationCustom" className="mt-2">
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									name="lastName"
									required
									type="text"
									placeholder="last name"
									defaultValue=""
									onChange={onChange}
								/>
								<Form.Control.Feedback type="invalid">
									Please enter Your Name
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="validationCustomEmail" className="mt-2">
								<Form.Label>Email</Form.Label>
								<Form.Control
									required
									name="email"
									type="email"
									placeholder="email"
									defaultValue=""
									onChange={onChange}
								/>
								<Form.Control.Feedback type="invalid">
									Please enter Your Email Id
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="validationCustomPassword" className="mt-2">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="password"
									required
									minLength={6}
									name="password"
									onChange={onChange}
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a Valid Password
								</Form.Control.Feedback>
								<Form.Text className="text-muted">
									password should contain atleast 6 characters
								</Form.Text>
							</Form.Group>
							<Form.Group
								controlId="validationCustomPassword_1"
								className="mt-2"
							>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="confirm password"
									required
									name="confirmPassword"
									minLength={6}
									onChange={onChange}
								/>
								<Form.Control.Feedback type="invalid">
									Your Passwords don't match
								</Form.Control.Feedback>
							</Form.Group>
							<p className="mt-3">
								Already have an account?
								<Link to="/login">
									<span>Login</span>
								</Link>
							</p>

							<Button
								type="submit"
								className="mb-2"
								disabled={isAuthenticated ? true : false}
							>
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
									hidden={!loading}
								/>
								Register
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Registration;
