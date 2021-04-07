import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Home from './pages/home.js';
import ForgotPassword from './pages/forgotpassword.js';
import SignUp from './pages/signup.js';
import SignIn from './pages/signin.js';
import Contact from './pages/contact.js';
import Settings from './pages/settings.js';
import PersonalInformation from './pages/personalinformation.js';
import EmployeeInformtion from './pages/employeeinformation.js';
import ContactPersonInformation from './pages/contactpersoninformation.js';
import SalaryInformation from './pages/salaryinformation.js';
import Orders from './pages/orders.js';
import OrderConfirmation from './pages/orderconfirmation.js';
import Checkout from './pages/checkout.js';
import Product from './pages/product.js';
import ProductList from './pages/productlist.js';
import Cart from './pages/cart.js';
import ResetPassword from './pages/resetpassword.js';
import ResponseAlert from './components/alerts/responsealert.js';
import PrivateRoute from './components/routers/privateRoute.js';
import Analytics from './components/analytics/analytics.js';

import { getCartItems } from './actions/cart.js';
const LumnergyApi = require("lumnergy_api");
const defaultClient = LumnergyApi.ApiClient.instance;


class App extends Component {

  state = {
    response: this.props.response,
  };


  componentDidMount(){
    if (this.props.auth.isAuthenticated) this.getCartItems(this.props.auth.authToken);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.isAuthenticated && nextProps.auth.isAuthenticated) {
      this.getCartItems(nextProps.auth.authToken);
    }

    if (nextProps.response.message !== this.props.response.message) {
      this.setState({
        response: nextProps.response,
      });
    }
  }

  getCartItems = (authToken) => {
    // Configure API key authorization: APIKeyAuth
    let APIKeyAuth = defaultClient.authentications["APIKeyAuth"];
    APIKeyAuth.apiKey = authToken;

    let apiInstance = new LumnergyApi.CartApi();

    let callback = (error, data, response) => {};
    getCartItems(apiInstance, callback)(this.props.dispatch);
  };

  render() {
    let { isAuthenticated, isProfileUpdated } = this.props.auth;
    
    return (
      <Router>
        <Analytics />
        <ResponseAlert response={this.state.response} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/about">
              <Home />
            </Route>
            <Route path="/signup">
              {isAuthenticated ? <Redirect to="/dashboard" /> : <SignUp />}
            </Route>
            <Route path="/signin">
              {isAuthenticated ? <Redirect to="/dashboard" /> : <SignIn />}
            </Route>
            <Route path="/forgotpassword">
              {isAuthenticated ? <Redirect to="/dashboard" /> : <ForgotPassword />}
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <PrivateRoute path="/orders" isAuthenticated={isAuthenticated} isProfileUpdated={isProfileUpdated}>
              <Orders />
            </PrivateRoute>
            <PrivateRoute path="/checkout" isAuthenticated={isAuthenticated} isProfileUpdated={isProfileUpdated}>
              <Checkout />
            </PrivateRoute>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/1kvaSolution">
              <Product />
            </Route>
            <Route path="/1-5kvaSolution">
              <Product />
            </Route>
            <Route path="/orderconfirmation">
              <OrderConfirmation />
            </Route>
            <PrivateRoute path="/dashboard" isAuthenticated={isAuthenticated} isProfileUpdated={isProfileUpdated}>
              <Orders />
            </PrivateRoute>
            <PrivateRoute path="/settings" isAuthenticated={isAuthenticated} isProfileUpdated={isProfileUpdated}>
              <Settings />
            </PrivateRoute>
            <PrivateRoute path="/setup" isAuthenticated={isAuthenticated} isProfileUpdated={isProfileUpdated}>
              <PersonalInformation />
            </PrivateRoute>
            <PrivateRoute path="/cart" isAuthenticated={isAuthenticated} isProfileUpdated={isProfileUpdated}>
              <Cart />
            </PrivateRoute>
            <Route path="/resetpassword/:authToken">
              <ResetPassword />
            </Route>
            {(!this.props.auth.isFinancingInformationUpdated) && (
              <>
                <PrivateRoute path="/financialassistancesetup" isAuthenticated={isAuthenticated} financialAssistanceSetupStep={true} isProfileUpdated={isProfileUpdated}>
                  <EmployeeInformtion />
                </PrivateRoute>
                <PrivateRoute path="/contactpersoninformation" isAuthenticated={isAuthenticated} financialAssistanceSetupStep={true} isProfileUpdated={isProfileUpdated}>
                  <ContactPersonInformation />
                </PrivateRoute>
                <PrivateRoute path="/salaryinformation" isAuthenticated={isAuthenticated} financialAssistanceSetupStep={true} isProfileUpdated={isProfileUpdated}>
                  <SalaryInformation />
                </PrivateRoute>
              </>
            )}
          </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    response:state.response
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);