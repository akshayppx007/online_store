import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  ListGroup,
  Alert,
  Button,
  Image,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import AddToCartAlert from "../layouts/alerts/addToCartAlert";
import { getProductDetails } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/loader";
import { addReview, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import { ADD_REVIEW_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading } = useSelector(state => state.productDetails);
  const { isUpdated, error } = useSelector(state => state.addReviews);
  const { isAuthenticated } = useSelector(
		(state) => state.persistReducer.loginUser
	);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setReviews(product.reviews);
      setStock(product.count);
    }
  }, [product]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity));
    setAddedToCart(true);
  };

  const submitReview = (e) => {
    e.preventDefault();
    const form = e.target.elements;
    const formData = {
      rating: form.rating.value,
      comment: form.comment.value,
    };
    if (e.target.checkValidity() === true) {
      dispatch(addReview(id, formData));
    }
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success("Review added successfully");
      dispatch(getProductDetails(id));
      navigate(`/product/${id}`)
      dispatch({
        type: ADD_REVIEW_RESET
      })
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [isUpdated, error, dispatch, navigate]);

  return (
    <>
    {loading ? <Loader /> :
      <Container>
        <AddToCartAlert addedToCart={addedToCart} />
        <Row className="mt-5">
          <Col md={4} style={{zIndex: 1}}>
          {product.images
                ? product.images.map((image, id) => (
                    <div key={id}>
                      <div key={id} id={`imageId${id + 1}`}>
                        <Image
                          crossOrigin="anonymous"
                          fluid
                          src={`${image.path ?? null}`}
                        />
                      </div>
                      <br />
                    </div>
                  ))
                : null}
          </Col>
          <Col md={8}>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h1>{product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating readonly size={20} initialValue={product && product.rating} /> ({reviews && reviews.length})                  
                    </ListGroup.Item>
                  <ListGroup.Item>
                    Price: <span className="fw-bold">${product.price}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>{product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                {" "}
                <ListGroup>
                  <ListGroup.Item>status: {stock > 0 ? "In Stock" : "Out of Stock"}</ListGroup.Item>
                  <ListGroup.Item>
                    Price: <span className="fw-bold">{product.price}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Select value={quantity} onChange={(e) => setQuantity(e.target.value)} >
                      {[...Array(stock).keys()].map((x) => (
                      <option key={x+1} value={x+1}>{x+1}</option>
                      ))}
                    </Form.Select>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button variant="warning" type="button" onClick={addToCartHandler}>Add To Cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <h5>REVIEWS</h5>
                <ListGroup variant="flush">
                  {reviews && reviews.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      {item.user.name}
                      <br />
                      <Rating readonly size={20} initialValue={item.rating}></Rating>
                      <br />
                      {item.createdAt.substring(0, 10)}
                      <br />
                      <p>
                        {item.comment}
                      </p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
            <hr />
            <Alert variant="danger" show={!isAuthenticated}>Login first to write a review</Alert>
            <Form onSubmit={submitReview} encType="application/json">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              ></Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Write Your Review</Form.Label>
                <Form.Control as="textarea" rows={3} disabled={!isAuthenticated} required name="comment" />
              </Form.Group>
              <Form.Select aria-label="Default select example" disabled={!isAuthenticated} required name="rating">
                <option>Rating</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </Form.Select>
              <Button className="mt-3 mb-3" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container> }
    </>
  );
}

export default ProductDetails;




