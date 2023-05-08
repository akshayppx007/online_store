import React, { useEffect } from "react";
import ProductCarousel from "../layouts/productCarousel";
import ProductCategory from "../layouts/productCategory";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/categoryActions";
import Loader from "../layouts/loader";


function Home() {

    const dispatch = useDispatch();
    const { loading, categories, error } = useSelector(state => state.categories);
    
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return <>
    { loading ? <Loader /> :  
    <>
     <ProductCarousel />
     <Container className="mt-5">
     <Row xs={1} md={2} className="g-4">
     {categories.map((category, idx) => <ProductCategory key={idx} category={category} />)}
     </Row>
     </Container> 
     </>}
    </>
};


export default Home;