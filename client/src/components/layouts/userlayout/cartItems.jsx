import { Button, Form, ListGroup, Image, Col, Row } from "react-bootstrap";
import { addToCart } from "../../../actions/cartActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function CartItemsComponent({item, addToCartHandler, removeFromCartHandler}) {
  const onDelete = () => {
    window.confirm("Do You Realy Want To Delete This From Your Cart")
    if (confirm) {
      removeFromCartHandler(item.productID)
    }
  };

  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image fluid crossOrigin="anonymous" src={item.image}></Image>
          </Col>
          <Col md={3}>{item.name}</Col>
          <Col md={2}>${item.price}</Col>
          <Col md={3}>
            <Form.Select value={item.quantity} onChange={(e) => addToCartHandler(item.productID, e.target.value)}>
            {[...Array(item.count).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                onDelete()
              }
            ><i className="bi bi-trash-fill"></i>
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
    </>
  );
}

export default CartItemsComponent;
