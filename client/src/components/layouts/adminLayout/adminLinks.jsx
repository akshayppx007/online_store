import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { clearErrors, logoutUser } from "../../../actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function AdminLinks() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isAuthenticated } = useSelector(
		(state) => state.persistReducer.loginUser
	);

	const logoutHandler = () => {
		dispatch(logoutUser());
	};

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
			toast.success("Logged out successfully");
		}
	}, [dispatch, isAuthenticated, navigate]);


	return (
		<>
			<Navbar bg="light" variant="light">
				<Nav className="flex-column">
					<LinkContainer to="/admin/orders">
						<Nav.Link>Orders</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/admin/products">
						<Nav.Link>Products</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/admin">
						<Nav.Link>User List</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/admin/chat">
						<Nav.Link>Chats</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/admin/analytics">
						<Nav.Link>Analylics</Nav.Link>
					</LinkContainer>
					<LinkContainer to="" onClick={() => logoutHandler()}>
						<Nav.Link>Logout</Nav.Link>
					</LinkContainer>
				</Nav>
			</Navbar>
		</>
	);
}

export default AdminLinks;
