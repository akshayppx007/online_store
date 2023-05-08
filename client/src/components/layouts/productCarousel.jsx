import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBestProducts } from "../../actions/productActions";

function ProductCarousel() {
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector(
		(state) => state.bestSellers
	);

  useEffect(() => {
    dispatch(getBestProducts());
  }, [dispatch]);

	return (
		<>
			<Carousel>
        {products && products.map((product, idx) => (
				<Carousel.Item key={idx}>
					<img
						crossOrigin="anonymous"
						className="d-block w-100"
						src={product.images[0].path}
						alt="First slide"
						style={{ height: "300px", objectFit: "cover" }}
					/>			
						<Carousel.Caption>
            <LinkContainer style={{ cursor: "pointer" }} to={`/product/${product._id}`}>
							<h3>{product.name}</h3>
              </LinkContainer>
							<p>{product.description}</p>
						</Carousel.Caption>
				</Carousel.Item>
        ))}
			</Carousel>
		</>
	);
}

export default ProductCarousel;
