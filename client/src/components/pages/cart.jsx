import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartItemsComponent from "../layouts/userlayout/cartItems";
import { useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { useDispatch } from "react-redux";

function Cart() {
  const { cartItems, itemsCount, cartSubtotal } = useSelector((state) => state.persistReducer.cart);
  const { user } = useSelector((state) => state.persistReducer.loginUser);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);



  const addToCartHandler = (id, quantity) => {
    dispatch(addToCart(id, quantity));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };



  useEffect(() => {
    if (cartItems.length === 0) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [cartItems]);
  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col md={8}>
            <h1>Cart Items</h1>
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <CartItemsComponent key={idx} item={item} addToCartHandler={addToCartHandler} removeFromCartHandler={removeFromCartHandler} />
              ))}
            </ListGroup>
            <Alert variant="info" show={alert}>Your Cart is Empty</Alert>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>
                  Sub Total <span className="fw-bold">({itemsCount})</span>
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                price: <span className="fw-bold">${cartSubtotal}</span>
              </ListGroup.Item>
              <ListGroup.Item>
              <Link to={`/user/${user && user._id}/cart/details`}>
                <Button variant="primary" type="button">
                  Procceed To Checkout
                </Button>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cart;




