import React, { Component } from "react";
import DefaultHeader from "../components/headers/default.js";
import DefaultFooter from '../components/footers/default.js';
import EmptyOrders from "../components/orders/emptyorders.js";
import OrderList from "../components/orders/orderlist.js";
import Loader from "../components/loader/loader.js";
import Retry from "../components/retry/retry.js";
import { getOrders } from "../actions/orders.js";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
const LumnergyApi = require("lumnergy_api");

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
    showRetryButton:false
  };

  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    this.setState({...this.state, showRetryButton:false, loading: true });
    const defaultClient = LumnergyApi.ApiClient.instance;

    const APIKeyAuth = defaultClient.authentications["APIKeyAuth"];
    APIKeyAuth.apiKey = this.props.token;

    const apiInstance = new LumnergyApi.OrdersApi();

    const callback = (error, data, response) => {
      if (response) {
        if (error) {
          console.error(error);
        } else {
          if (data.data === null) {
            this.setState({ ...this.state, loading: false, orders: [] });
          } else {
            this.setState({ ...this.state, loading: false, orders: data.data });
          }
        }
      }else{
        this.setState({...this.state, loading:false,showRetryButton:true });
      }
    };
    getOrders(apiInstance, callback)(this.props.dispatch);
  };

  render() {
    let { orders } = this.state;
    let ordersLength = orders.length;
    return (
      <div className="h-100 d-flex flex-column justify-content-between">
      <Loader loading={this.state.loading} />
      <Retry show={this.state.showRetryButton} retry={this.getOrders} />
      <Container>
        <DefaultHeader />

        {ordersLength !== 0 ? (
          <OrderList orders={orders} ordersLength={ordersLength} />
        ) : (
          <EmptyOrders />
        )}
      </Container>
      <DefaultFooter />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.authToken
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
)(Orders);
