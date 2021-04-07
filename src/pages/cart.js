import React, { Component } from "react";
import DefaultHeader from "../components/headers/default.js";
import DefaultFooter from '../components/footers/default.js';
import "./cart.css";
import EmptyCart from "../components/cart/emptycart.js";
import CartList from "../components/cart/cartlist.js";
import { getCartItems, deleteCartItems } from "../actions/cart.js";
import DeleteModal from "../components/alerts/deletemodal.js";
import Loader from "../components/loader/loader.js";
import Retry from "../components/retry/retry.js";
import { connect } from "react-redux";

const LumnergyApi = require("lumnergy_api");
const defaultClient = LumnergyApi.ApiClient.instance;

class Cart extends Component {
  state = {
    items: [],
    showDeleteModal: false,
    itemId: "",
    loading: false,
    showRetryButton:false
  };
  componentDidMount() {
    this.getCartItems();
  }
  getCartItems = () => {
    this.setState({ ...this.state, loading: true, showRetryButton:false });
    let APIKeyAuth = defaultClient.authentications["APIKeyAuth"];
    APIKeyAuth.apiKey = this.props.token;

    let apiInstance = new LumnergyApi.CartApi();

    let callback = (error, data, response) => {
      if(response){
      if (error) {
        console.error(error);
        this.setState({ ...this.state, loading: false });
      } else {
        if (data.data === null) {
          this.setState({ ...this.state, items: [], loading: false });
        } else {
          if (data.data === null) {
            this.setState({ ...this.state, items: [], loading: false });
          } else {
            this.setState({ ...this.state, items: data.data, loading: false });
          }
        }
      }
    }else{
      this.setState({...this.state, loading:false, showRetryButton:true });
    }
    };
    getCartItems(apiInstance, callback)(this.props.dispatch);
  };

  deleteCartItems = cartItemId => {
    this.setState({ ...this.state, loading: true });
    const APIKeyAuth = defaultClient.authentications["APIKeyAuth"];
    APIKeyAuth.apiKey = this.props.token;

    const apiInstance = new LumnergyApi.CartApi();

    const callback = (error, data, response) => {
      if (response) {
        if (error) {
          console.error(error);
        } else {
          this.setState({
            ...this.state,
            items: [],
            showDeleteModal: false,
            loading: false
          });
        }
      }
    };
    deleteCartItems(cartItemId, apiInstance, callback)(this.props.dispatch);
  };

  handleModalOpen = itemId => {
    this.setState({
      ...this.state,
      showDeleteModal: true,
      itemId: itemId,
      loading: false
    });
  };

  handleModalClose = () => {
    this.setState({ ...this.state, showDeleteModal: false, loading: false });
  };

  render() {
    let { items } = this.state;
    let itemsLength = items.length;
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += 1 * item.item.price;
    });
    return (
      <div className="h-100 d-flex flex-column justify-content-between">
        <Loader loading={this.state.loading} />
        <Retry show={this.state.showRetryButton} retry={this.getCartItems}/>
        <DefaultHeader />
        {itemsLength !== 0 ? (
          <>
            <DeleteModal
              itemId={items[0].id}
              show={this.state.showDeleteModal}
              deleteCartItems={this.deleteCartItems}
              handleModalClose={this.handleModalClose}
            />
            <CartList
              items={items}
              totalPrice={totalPrice}
              handleModalOpen={this.handleModalOpen}
            />
          </>
        ) : (
          <EmptyCart />
        )}
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
)(Cart);
