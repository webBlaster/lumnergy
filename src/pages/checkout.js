import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import DefaultHeader from "../components/headers/default.js";
import CheckOutList from "../components/checkout/checkoutlist.js";
import LoadingButton from "../components/loader/loadingbutton.js";
import InformationModal from "../components/checkout/informationmodal.js";
import { addOrderItem } from "../actions/orders.js";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { UNCHECKED_FINANCING, CHECKED_FINANCING } from "../constants.js";

const LumnergyApi = require("lumnergy_api");
const defaultClient = LumnergyApi.ApiClient.instance;

class Checkout extends Component {
  state = {
    loading: false,
    showInformationModal: false
  };

  onChange = event => {
    event.target.checked
      ? this.props.dispatch({ type: CHECKED_FINANCING })
      : this.props.dispatch({ type: UNCHECKED_FINANCING });
  };

  openInformationModal = () => {
    this.setState({ ...this.state, showInformationModal: true });
  };

  closeInformationModal = () => {
    this.setState({ ...this.state, showInformationModal: false });
  };

  addOrderItem = () => {
    if (
      this.props.optInForFinancing &&
      !this.props.authInfo.isFinancingInformationUpdated
    ) {
      this.props.history.push("/financialassistancesetup");
    } else {
      this.setState({ loading: true });
      let APIKeyAuth = defaultClient.authentications["APIKeyAuth"];
      APIKeyAuth.apiKey = this.props.authInfo.authToken;

      let apiInstance = new LumnergyApi.OrdersApi();
      let { items } = this.props;
      const body = {
        id: items[0].item.id,
        items: [items[0].item],
        optInForFinancing: this.props.optInForFinancing,
        totalPrice: items[0].item.price
      };

      const callback = (error, data, response) => {
        if (error) {
          this.setState({ loading: false });
        } else {
          this.props.history.push("/orderconfirmation");
        }
      };
      addOrderItem(body, apiInstance, callback)(this.props.dispatch);
    }
  };

  render() {
    let { items, authInfo } = this.props;
    let amountOfItems = items ? items.length : 0;
    return amountOfItems !== 0 ? (
      <div>
        <DefaultHeader />
        <Container>
          <InformationModal
            show={this.state.showInformationModal}
            onHide={this.closeInformationModal}
          />
          <Row className="mt-5 mb-5">
            <Col sm={12} md={6}>
              <h4 className="text-center justify-content-between align-items-center mb-3">
                <span className="text-muted text-center">Order Info</span>
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">
                      {authInfo.firstName} {authInfo.lastName}
                    </h6>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{authInfo.email}</h6>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{authInfo.address}</h6>
                  </div>
                </li>
              </ul>
            </Col>
            <Col sm={12} md={6}>
              <CheckOutList
                items={this.props.items}
                addOrderItem={this.addOrderItem}
                loading={this.state.loading}
              />
              <Card className="bg-warning mb-2">
                <Card.Body>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="financialassistance"
                      onChange={this.onChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="financialassistance"
                    >
                      Opt for Financial Assistance
                    </label>
                  </div>
                  <u className="" onClick={this.openInformationModal}>
                    Learn More
                  </u>
                </Card.Body>
              </Card>
              <span
                onClick={() => {
                  this.addOrderItem();
                }}
              >
                <LoadingButton
                  name="Checkout"
                  loading={this.state.loading}
                  type={"button"}
                  onClick={() => {
                    this.addOrderItem();
                  }}
                />
              </span>
            </Col>
          </Row>
        </Container>
      </div>
    ) : (
      <Redirect to="/cart" />
    );
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.auth,
    items: state.cart.items,
    optInForFinancing: state.financing.optInForFinancing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Checkout));
