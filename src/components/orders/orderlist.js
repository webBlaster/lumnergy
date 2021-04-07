import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { numberFormat } from "../../utils.js";

const orderList = ({ orders, ordersLength } =this.props ) => {

    const list = orders.map( order => {
        return (<li className="list-group-item d-flex justify-content-between lh-condensed" key={order.id}>
        <div>
          <h6 className="my-0">{order.title}</h6>
          <small className="text-muted">Order Item</small>
        </div>
        <span className="text-muted">{numberFormat(order.totalPrice/100)}</span>
      </li>)
    })
  return (
    <Container className="mt-5">
            <Row>
              <Col md={12} mb={12}>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Your Current Orders</span>
                  <span className="badge badge-secondary badge-pill">{ordersLength}</span>
                </h4>
                <ul className="list-group mb-3">
                  {list}
                </ul>
              </Col>
            </Row>
          </Container>
  );
};

export default orderList;