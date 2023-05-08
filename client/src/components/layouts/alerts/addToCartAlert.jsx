import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AddToCartAlert({addedToCart}) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible show={addedToCart}>
        <Alert.Heading>item added to cart</Alert.Heading>
        <Link to="/cart">
          <Button variant="warning">go to cart</Button>
        </Link>
      </Alert>
    );
  }
}

export default AddToCartAlert;
