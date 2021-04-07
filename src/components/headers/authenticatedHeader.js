import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";

import logo from "../../assets/logo.png";
import "./default.css";
import { LOGOUT_USER } from "../../constants.js";
import { clearAuthInfo } from "../../utils.js";

function authenticatedHeader(props) {
  function logout() {
    props.dispatch({ type: LOGOUT_USER });

    clearAuthInfo();

    props.history.push("/signin");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="/">
        <img src={logo} alt="logo" width="100px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Product
          </Link>
          <Link to="/cart" className="nav-link">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-cart-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
              />
            </svg>{" "}
            Cart
            <span className="badge badge-info ml-1">
              {props.cart !== null ? props.cart.length : 0}
            </span>
          </Link>
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              id="dropdown-basic"
              className="nav-link"
            >
              {props.auth.firstName} {props.auth.lastName}
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark">
              <Link to="/orders" className="nav-link dropdown-item bg-dark">
                Orders
              </Link>
              <Link to="/settings" className="nav-link">
                Settings
              </Link>
              <Nav.Link className="nav-link" onClick={logout}>
                Logout
              </Nav.Link>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart.items
  };
};

const mapDispatchToProps = dispatch => {
  return { dispatch };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(authenticatedHeader));
