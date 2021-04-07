import React from "react";
import "./emptyorders.css";
import { Link } from "react-router-dom";

const emptyOrders = () => {
  return (
    <div className="container-fluid mt-100">
      <div className="row">
        <div className="col-md-12">
          <div className="card-body emptyorders">
            <div className="col-sm-12 empty-cart-cls text-center">
              <h3 className="text-muted">
                <strong>Your Order is Empty</strong>
              </h3>
              <h4 className="text-muted">Order something to make me happy :)</h4>{" "}
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

export default emptyOrders;
