import React, { Component } from "react";
import { Card, Col, Container, Jumbotron, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddToCartButton from "../components/product/addtocartbutton.js";
import { productList } from "./productlistdata.js";
import "./home.css";
import DefaultHeader from "../components/headers/default.js";
import DefaultFooter from "../components/footers/default.js";
import TwoBatteries from "../assets/twobatteries.svg";
import SingleBattery from "../assets/singlebattery.svg";

class Home extends Component {
  render() {
    return (
      <div>
        <DefaultHeader />
        <Jumbotron className="main-content">
          <Container className="h-100 text-center">
            <Row className="h-100">
              <Col md="3"></Col>
              <Col
                md="6"
                className="h-100 d-flex flex-column justify-content-center"
              >
                <h1 className="subhead text-center">
                  Power solutions at affordable rate
                </h1>
                <p>
                  <Link to="/signup" className="btn btn-primary">
                    Join Now
                  </Link>
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <section className="section">
          <Container>
            <Row>
              <Col md="3"></Col>
              <Col md="6">
                <div className="about-section">
                  <h1 className="text-center section-heading">
                    About Lumnergy
                  </h1>
                  <p className="text-center">
                    Lumnergy is a power solutions company that look to tackle
                    the power problems faced by the everyday consumer and
                    helping them reach their required power related goals at a
                    reasonable cost.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section">
          <Container>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section">
          <Container>
            <Row>
              <Col md="4">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>Why You Need Alternative Power</Card.Title>
                    <Card.Text>
                      Alternative power provides reliable power supplies and
                      fuel diversification, which enhance energy security and
                      lower risk of fuel spills while reducing the need for
                      fuels and noise from a power generating set.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="4">
                <Card className="info-card text-center">
                  <Card.Body>
                    <Card.Title>What are inverter solutions</Card.Title>
                    <Card.Text>
                      An inverter is a device that converts Direct Current (DC)
                      electricity to Alternating Current (AC) electricity. The
                      inverter system through batteries stores power as DC, the
                      inverter converts this DC current to AC current.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="4">
                <Card className="info-card text-center">
                  <Card.Body>
                    <Card.Title>Why Patronise Lumnergy</Card.Title>
                    <Card.Text>
                      Lumnergy will provide cost efficient and durable
                      alternative power supply to your everyday power needs at
                      reasonable cost
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section">
          <Container>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section">
          <Container className="product-content h-100">
            <Row>
              <Col>
                <h1 className="text-center section-headline">Products</h1>
              </Col>
            </Row>
            <Row className="h-100">
              <Col
                md="6"
                className="mh-100 d-flex flex-column justify-content-center text-center"
              >
                <h1 className="product-headline">1kva inverter solution</h1>
                <div className="m-4">
                  <AddToCartButton
                    item={{
                      itemId: productList[0].itemId,
                      title: productList[0].title,
                      price: productList[0].price
                    }}
                  />
                </div>
                <div className="mb-4">
                  <Link to="/1kvaSolution">Learn more&nbsp;&gt;</Link>
                </div>
              </Col>
              <Col
                md="6"
                className="h-100 d-flex flex-column justify-content-center text-center"
              >
                <img src={SingleBattery} className="img-fluid" alt="" />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section">
          <Container className="product-content" id="products">
            <Row className="d-flex">
              <Col
                md="6"
                className="mh-100 d-flex flex-column justify-content-center order-md-2 text-center"
              >
                <h1 className="product-headline">1.5kva inverter solution</h1>
                <div className="m-4">
                  <AddToCartButton
                    item={{
                      itemId: productList[1].itemId,
                      title: productList[1].title,
                      price: productList[1].price
                    }}
                  />
                </div>
                <div className="mb-4">
                  <Link to="/1-5kvaSolution">Learn more&nbsp;&gt;</Link>
                </div>
              </Col>
              <Col md="6" className="order-md-1 text-center">
                <img src={TwoBatteries} className="img-fluid" alt="" />
              </Col>
            </Row>
          </Container>
        </section>
        <DefaultFooter />
      </div>
    );
  }
}

export default Home;
