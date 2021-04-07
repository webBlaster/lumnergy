import React, { Component } from "react";
import DefaultHeader from "../components/headers/default.js";
import DefaultFooter from '../components/footers/default.js';
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import { productList } from "./productlistdata.js";
import AddToCartButton from "../components/product/addtocartbutton.js";


class ProductList extends Component {


    render() {
        return (
            <div className="h-100 d-flex flex-column justify-content-between">
                <Container>
                    <DefaultHeader />
                    <Row className="mt-5 mb-5 offset-md-2">
                        <Col sm={12} md={5} >
                            <Card className="mt-5 text-center">
                                <Card.Img variant="top" src={productList[0].image} />
                                <Card.Body>
                                    <Card.Title>{productList[0].title}</Card.Title>
                                    <div className="mt-4"></div>
                                    <AddToCartButton item={{
                                        itemId: productList[0].itemId,
                                        title: productList[0].title,
                                        price: productList[0].price
                                    }} /><br/>
                                    <div className="mt-4"></div>
                                   <Link to="/1kvaSolution">Learn more</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} md={5}>
                            <Card className="mt-5 text-center">
                                <Card.Img variant="top" src={productList[1].image} />
                                <Card.Body>
                                    <Card.Title>{productList[1].title}</Card.Title>
                                    <div className="mt-4"></div>
                                    <AddToCartButton  item={{
                                        itemId: productList[1].itemId,
                                        title: productList[1].title,
                                        price: productList[1].price
                                    }} /><br/>
                                    <div className="mt-4"></div>
                                    <Link to="/1-5kvaSolution">Learn more</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <DefaultFooter />
            </div>
        );
    }
}


export default ProductList;
