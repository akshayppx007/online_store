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
import { useDispatch } from "react-redux";
import { clearErrors, loginUsers } from "../../actions/userActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
	const [validated, setValidated] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, error, user, token, isAuthenticated } = useSelector(
		(state) => state.persistReducer.loginUser
	);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.preventDefault();
			dispatch(loginUsers(email, password));
		}
		setValidated(true);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	useEffect(() => {
		if (isAuthenticated == true && user && user.isAdmin == true) {
			navigate("/admin");
			toast.success("welcome admin");
		} else if (isAuthenticated == true && user && user.isAdmin == false) {
			navigate("/");
			toast.success(`welcome ${user.firstName}`);
		}
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [isAuthenticated, user, navigate, toast, dispatch, error]);

	return (
		<>
			<Container>
				<Row className="mt-5 justify-content-md-center">
					<Col md={6}>
						<h1>Login</h1>
						<Form noValidate validated={validated} onSubmit={handleSubmit}>
							<Form.Group controlId="validationCustomEmail" className="mt-2">
								<Form.Label>Email</Form.Label>
								<Form.Control
									required
									name="email"
									type="email"
									placeholder="email"
									value={email}
									onChange={handleEmail}
								/>
							</Form.Group>
							<Form.Group controlId="validationCustomPassword" className="mt-2">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="password"
									required
									minLength={6}
									name="password"
									value={password}
									onChange={handlePassword}
								/>
							</Form.Group>
							{/* <Form.Group controlId="stayLoggedIn" className="mt-2">
                <Form.Check
                  type="checkbox"
                  name="stayLoggedIn"
                  label="Stay Logged In"
                />
              </Form.Group> */}
							<p className="mt-3">
								Don't have an account? <Link to="/register">Sign Up</Link>
							</p>

							<Button type="submit" className="mb-2" id="loginButton">
								{loading ? (
									<Spinner
										as="span"
										animation="border"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
								) : null}
								Login
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Login;
