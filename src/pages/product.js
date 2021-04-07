import React, { Component } from "react";
import DefaultHeader from "../components/headers/default.js";
import DefaultFooter from '../components/footers/default.js';
import { withRouter } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import { productList } from "./productlistdata.js";
import AddToCartButton from "../components/product/addtocartbutton.js";

import BatteryAlone from "../assets/batteryalone.svg";
import InverterAlone from "../assets/inverteralone.svg";
import "../pages/home.css";

class Product extends Component {
 

  render() {
    const location = window.location.href;
    const pathString = location.split("/", 4)[3];
    let products = {};
    pathString === "1kvaSolution"
      ? (products = productList[0])
      : (products = productList[1]);
    return (
      <>
      <Container>
        <DefaultHeader />

          <Container className="mt-5">
          <Row>
            <Container className="col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
              
              <img
                width="100%"
                alt=""
                src={products.image}
              />
    
            </Container>
          </Row>

            <Container className="mb-3 mt-5">
              <b>
                <h1 className="text-center section-headline">{products.title}</h1>
              </b>
              <p className="text-center">
                {products.summary}
              </p>
            </Container>
            <Row className="justify-content-center mb-5 mt-5">
              <Col md={6} sm={12} className="text-center mt-5">
                <img width="95%" alt="" src={InverterAlone} />
              </Col>
              <Col md={6} sm={12} className="mt-5 text-center">
                <h2 className="text-center product-headline">Inverter</h2>
                <Card.Body>
                  An Inverter is a power electronic device that changes Direct current(DC) to Alternating current (AC).
                  it uses batteries to supply power when mains power is not available. when mains power is restored, 
                  a rectifier supplies DC power to recharge the batteries.
              </Card.Body>
              </Col>
            </Row>
            <Row className="mb-5 mt-5">
              <Col md={6} sm={12} className="text-center mt-5 order-2 order-md-1 order-lg-1">
                <h2 className="text-center product-headline">Battery</h2>
                <Card.Body>
                  A tubular battery uses technology that seals the active material in polyester tubes, instead of pasting it on the surface of the plate. as a result, 
                  theres no shedding or corrosion, ensuring long battery life Owing to their toughness and durability, tubular batteries can operate at extreme temperatures,
                  and are used in high cyclic applications involving frequent and prolonged power outages.
              </Card.Body>
              </Col>
              <Col md={6} sm={12} className="mt-5 order-1 order-md-2 order-lg-2">
                <img width="95%" alt="" src={BatteryAlone} />
              </Col>
            </Row>
          </Container>
          <div className="text-center mb-5">
            <AddToCartButton item={{
                  itemId: products.itemId,
                  title: products.title,
                  price: products.price
                }}/>
          </div>
        </Container>
        <DefaultFooter />
      </>
    );
  }
}



export default withRouter(Product);
