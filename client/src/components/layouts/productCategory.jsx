import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function ProductCategory({category}) {


    return <>
     <LinkContainer style={{cursor: "pointer"}} to="/product-list">
        <Card>
      <Card.Img crossOrigin="anonymous" variant="top" src={category.image} />
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text>
         {category.description}
        </Card.Text>
      </Card.Body>
     
    </Card>
    </LinkContainer>
    </>
};

export default ProductCategory;