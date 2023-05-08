import React, { useEffect } from "react";
import {
	Navbar,
	Nav,
	Container,
	NavDropdown,
	Badge,
	Form,
	DropdownButton,
	Dropdown,
	Button,
	InputGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategories } from "../../actions/categoryActions";
import socketIOClient from "socket.io-client";
import {
	setChatRooms,
	setSocket,
	setMessageReceived,
	removeChatRoom,
} from "../../actions/chatActions";

function Header() {
	const { isAuthenticated, user } = useSelector(
		(state) => state.persistReducer.loginUser
	);
	const { messageReceived } = useSelector((state) => state.adminChat);
	const { itemsCount } = useSelector((state) => state.persistReducer.cart);
	const [admin, setAdmin] = useState("none");
	const [userPanel, setUserPanel] = useState("none");
	const [loginRegister, setLoginRegister] = useState("inline-block");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const { categories } = useSelector((state) => state.categories);

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	const logoutHandler = () => {
		dispatch(logoutUser());
		navigate("/");
		toast.success("Logged out successfully");
	};

	const submitHandler = (e) => {
		if (e.keyCode && e.keyCode !== 13) return;
		e.preventDefault();
		if (searchQuery.trim()) {
			if (searchCategoryToggle === "All") {
				navigate(`/product-list/search/${searchQuery}`);
			} else {
				navigate(
					`/product-list/category/${searchCategoryToggle.replaceAll(
						"/",
						","
					)}/search/${searchQuery}`
				);
			}
		} else if (searchCategoryToggle !== "All") {
			navigate(
				`/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`
			);
		} else {
			navigate("/product-list");
		}
	};

	useEffect(() => {
		if (isAuthenticated && user && user.isAdmin === true) {
		  setAdmin("inline-block");
		  setUserPanel("none");
		  setLoginRegister("none");
		} else if (isAuthenticated && user && user.isAdmin === false) {
		  setAdmin("none");
		  setUserPanel("inline-block");
		  setLoginRegister("none");
		} else {
		  setAdmin("none");
		  setUserPanel("none");
		  setLoginRegister("inline-block");
		}
	  }, [isAuthenticated, user]);
	  
	//   useEffect(() => {
	// 	if (user && user.isAdmin) {
	// 	  var audio = new Audio("/audio/chat.mp3");
	// 	  const socket = socketIOClient();
	// 	  socket.emit(
	// 		"admin connected with server",
	// 		"Admin" + Math.floor(Math.random() * 1000000000000)
	// 	  );
	// 	  socket.on(
	// 		"server sends message from client to admin",
	// 		({ user, message }) => {
	// 		  dispatch(setSocket(socket));
	// 		  dispatch(setChatRooms(user, message));
	// 		  dispatch(setMessageReceived(true));
	// 		  audio.play();
	// 		}
	// 	  );
	// 	  socket.on("disconnected", ({ reason, socketId }) => {
	// 		dispatch(removeChatRoom(socketId));
	// 	  });
	// 	  return () => socket.disconnect();
	// 	}
	//   }, [user && user.isAdmin]);

	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="" variant="dark" id="navbar">
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand href="/">e-shop</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<InputGroup>
								<DropdownButton
									id="dropdown-basic-button"
									variant="secondary"
									title={searchCategoryToggle}
								>
									<Dropdown.Item onClick={() => setSearchCategoryToggle("All")}>
										All
									</Dropdown.Item>
									{categories.map((category, id) => (
										<Dropdown.Item
											key={id}
											onClick={() => setSearchCategoryToggle(category.name)}
										>
											{category.name}
										</Dropdown.Item>
									))}
								</DropdownButton>

								<Form.Control
									onKeyUp={submitHandler}
									onChange={(e) => setSearchQuery(e.target.value)}
									type="text"
									placeholder="search.."
									id="searchInput"
								/>
								<IconButton
									aria-label="search"
									size="large"
									id="iconButton"
									onClick={submitHandler}
								>
									<SearchIcon
										id="searchBtn"
										fontSize="inherit"
										color="secondary"
									/>
								</IconButton>
							</InputGroup>
						</Nav>
						<Nav>
							<LinkContainer to="/admin" style={{ display: admin }}>
								<Nav.Link>
									Admin
									{messageReceived && (
										<span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
									)}
								</Nav.Link>
							</LinkContainer>

							<NavDropdown
								title={user ? `${user.firstName} ${user.lastName}` : "user"}
								id="collasible-nav-dropdown"
								style={{ display: userPanel }}
							>
								<NavDropdown.Item
									eventKey={"/user/:id"}
									as={Link}
									to={`/user/${user && user._id}`}
								>
									Profile
								</NavDropdown.Item>
								<NavDropdown.Item
									eventKey={"user/:id/orders"}
									as={Link}
									to={`/user/${user && user._id}/orders`}
								>
									Orders
								</NavDropdown.Item>

								<NavDropdown.Divider />
								<NavDropdown.Item href="" onClick={() => logoutHandler()}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
							<LinkContainer to="/login" style={{ display: loginRegister }}>
								<Nav.Link>login</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/register" style={{ display: loginRegister }}>
								<Nav.Link>register</Nav.Link>
							</LinkContainer>

							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fa-solid fa-cart-shopping"></i>
									<Badge bg="danger">{itemsCount}</Badge>
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default Header;


