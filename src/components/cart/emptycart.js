import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const EmptyCart = () => {
  return (
    <div className="container-fluid mt-100">
      <div className="row">
        <div className="col-md-12">
          <div className="card-body cart cart-logo-contatiner">
            <div className="col-sm-12 empty-cart-cls text-center">
              {" "}
              <svg
                width="130"
                height="130"
                viewBox="0 0 16 16"
                className="bi bi-cart-fill img-fluid mb-4 mr-3 text-muted"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                />
              </svg>
              <h3 className="text-muted">
                <strong>Your Cart is Empty</strong>
              </h3>
              <h4 className="text-muted">Add something to make me happy :)</h4>{" "}
              <Link to="/products" className="btn btn-primary cart-btn-transform m-3 white-text">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
