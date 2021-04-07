import React, { Component } from "react";
import { Container, Alert } from "react-bootstrap";

import DefaultHeader from "../components/headers/default.js";
import DefaultFooter from "../components/footers/default.js";


class OrderConfirmation extends Component {
  render() {
    return (
      <div className="h-100 d-flex flex-column justify-content-between">
      <Container>
        <DefaultHeader />
        <Alert variant="success" className="mt-5">
          <h4>
            Thank you for placing your order. Someone will reach out to you
            shortly
          </h4>
        </Alert>
      </Container>
      <DefaultFooter />
      </div>
    );
  }
}

export default OrderConfirmation;
