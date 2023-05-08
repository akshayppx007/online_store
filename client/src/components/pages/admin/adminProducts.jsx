import React, { useEffect } from "react";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import AdminLinks from "../../layouts/adminLayout/adminLinks";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../layouts/loader";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProductsAdmin } from "../../../actions/productActions";
import { toast } from "react-toastify";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";

function AdminProducts() {
	const dispatch = useDispatch();
	const { isDeleted } = useSelector((state) => state.deleteProduct);

	const deleteHandler = (id) => {
		window.confirm("are you sure?");
		if (window.confirm) {
			dispatch(deleteProduct(id));
		}
	};

	useEffect(() => {
		if (isDeleted) {
			toast.success("product deleted successfully");
			dispatch(getProductsAdmin());
		}
		dispatch({type: DELETE_PRODUCT_RESET});

	}, [dispatch, isDeleted]);

	
	const { loading, products, error } = useSelector(
		(state) => state.products
	);
	const { user } = useSelector(state => state.persistReducer.loginUser);

	useEffect(() => {
		dispatch(getProductsAdmin());
	}, [dispatch]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container>
					<Row className="mt-4">
						<Col md={2}>
							<AdminLinks />
						</Col>
						<Col md={10}>
							<h1>Product Details</h1>
							<LinkContainer to={`/admin/${user && user._id}/product/create`}>
								<Button type="button" className="mb-2">
									create new
								</Button>
							</LinkContainer>
							<Table striped bordered hover responsive>
								<thead>
									<tr>
										<th>#</th>
										<th>Product</th>
										<th>Price</th>
										<th>Category</th>
										<th>Edit/Delete</th>
									</tr>
								</thead>
								<tbody>
									{products && products.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.name}</td>
											<td>{item.price}</td>
											<td>{item.category}</td>
											<td>
												<LinkContainer to={`/admin/product/${item._id}`}>
													<Button className="mt-2 mb-2 me-2"
														type="button"
														variant="primary"
													>
														<i className="bi bi-pencil-square"></i>
													</Button>
												</LinkContainer>
												<Button className="mt-2 mb-2"
													type="button"
													variant="danger"
													onClick={() => deleteHandler(item._id)}
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
				</Container>
			)}
		</>
	);
}

export default AdminProducts;
