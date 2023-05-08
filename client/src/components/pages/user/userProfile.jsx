import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Spinner,
	Alert,
	Toast,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	updateUserDetails,
	loginUsers,
	clearErrors,
	getUserProfile,
} from "../../../actions/userActions";
import { toast } from "react-toastify";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import Loader from "../../layouts/loader";

function UserProfile() {
	const { id } = useParams();
	const [validated, setValidated] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.persistReducer.loginUser);
	const { loading, error, isUpdated } = useSelector(
		(state) => state.userProfile
	);

	const [firstName, setFirstName] = useState(user?.firstName || "");
	const [lastName, setLastName] = useState(user?.lastName || "");
	const [email, setEmail] = useState(user?.email || "");
	const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
	const [address, setAddress] = useState(user?.address || "");
	const [state, setState] = useState(user?.state || "");
	const [city, setCity] = useState(user?.city || "");
	const [pinCode, setPincode] = useState(user?.pinCode || "");
	const [password, setPassword] = useState(user?.password || "");

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.preventDefault();
			dispatch(
				updateUserDetails({
					firstName,
					lastName,
					email,
					phoneNumber,
					address,
					state,
					city,
					pinCode,
					password,
				})
			);
		}

		setValidated(true);
	};

	useEffect(() => {
		if (isUpdated) {
			toast.success("Profile updated successfully");
			dispatch(getUserProfile());
			navigate(`/user/${id}`);
			dispatch({
				type: UPDATE_PROFILE_RESET,
			});
		}
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [error, loading, user, navigate, toast, dispatch, isUpdated]);

	const onChange = () => {
		const password = document.querySelector("input[name=password]");
		const confirmPassword = document.querySelector(
			"input[name=confirmPassword]"
		);

		if (password.value === confirmPassword.value) {
			confirmPassword.setCustomValidity("");
			setPassword(password.value);
		} else {
			confirmPassword.setCustomValidity("passwords don't match");
		}
	};
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container>
					<Row className="mt-5 justify-content-md-center">
						<Col md={6}>
							<h1>User Profile</h1>
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
										type="text"
										defaultValue={firstName}
										onChange={(e) => {
											setFirstName(e.target.value);
										}}
									/>
								</Form.Group>
								<Form.Group controlId="validationCustom" className="mt-2">
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										name="lastName"
										type="text"
										defaultValue={lastName}
										onChange={(e) => {
											setLastName(e.target.value);
										}}
									/>
								</Form.Group>
								<Form.Group controlId="validationCustomEmail" className="mt-2">
									<Form.Label>Email</Form.Label>
									<Form.Control disabled defaultValue={email} />
								</Form.Group>
								<Form.Group controlId="phoneNumberId" className="mt-2">
									<Form.Label>Phone Number</Form.Label>
									<Form.Control
										name="phoneNumber"
										type="text"
										defaultValue={phoneNumber}
										onChange={(e) => {
											setPhoneNumber(e.target.value);
										}}
									/>
								</Form.Group>
								<Form.Group controlId="addressId" className="mt-2">
									<Form.Label>Address</Form.Label>
									<Form.Control
										name="address"
										type="text"
										defaultValue={address}
										onChange={(e) => {
											setAddress(e.target.value);
										}}
									/>
								</Form.Group>
								<Form.Group controlId="pincodeId" className="mt-2">
									<Form.Label>Pincode</Form.Label>
									<Form.Control
										name="pincode"
										type="text"
										defaultValue={pinCode}
										onChange={(e) => {
											setPincode(e.target.value);
										}}
									/>
								</Form.Group>
								<Form.Group controlId="cityId" className="mt-2">
									<Form.Label>City</Form.Label>
									<Form.Control
										name="city"
										type="text"
										defaultValue={city}
										onChange={(e) => {
											setCity(e.target.value);
										}}
									/>
								</Form.Group>
								<Form.Group controlId="stateId" className="mt-2">
									<Form.Label>State</Form.Label>
									<Form.Control
										name="state"
										type="text"
										defaultValue={state}
										onChange={(e) => {
											setState(e.target.value);
										}}
									/>
								</Form.Group>

								<Form.Group
									controlId="validationCustomPassword"
									className="mt-2"
								>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										name="password"
										minLength={6}
										onChange={onChange}
									/>
									<Form.Control.Feedback type="invalid">
										Please enter a valid password
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group
									controlId="validationCustomPassword_1"
									className="mt-2"
								>
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										name="confirmPassword"
										minLength={6}
										onChange={onChange}
									/>
									<Form.Control.Feedback type="invalid">
										Your Passwords don't match
									</Form.Control.Feedback>
								</Form.Group>

								<Button type="submit" className="mb-2 mt-2">
									Update
								</Button>
								<Alert show={true} variant="success">
									Updated successfully
								</Alert>
							</Form>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
}

export default UserProfile;
