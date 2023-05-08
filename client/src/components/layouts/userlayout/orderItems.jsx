import { ListGroup, Image, Col, Row } from "react-bootstrap";

function OrderItems({item}) {
	return (
		<>
			<ListGroup.Item>
				<Row>
					<Col md={3}>
						<Image fluid crossOrigin="anonymous" src={item.image.path}></Image>
					</Col>
					<Col md={3}>
						{item.name}
					</Col>
                    <Col md={3}>
						{item.quantity}
					</Col>
					<Col md={3}>${item.price}</Col>
				</Row>
			</ListGroup.Item>
			<br />
		</>
	);
}

export default OrderItems;
