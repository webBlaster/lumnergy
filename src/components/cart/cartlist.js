import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { numberFormat } from "../../utils.js";

const cartList = ({ items, totalPrice, handleModalOpen } = this.props) => {
  const list = items.map(item => {
    return (
      <li className="row cart-row" key={item.item.id}>
        <span className="quantity col-sm-4">1</span>
        <span className="itemName col-sm-4">{item.item.title}</span>
        <span className="price col-sm-4">
          {numberFormat(item.item.price/100)}
          <span
            className="delete"
            onClick={() => {
              handleModalOpen(item.id);
            }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-trash-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
              />
            </svg>
          </span>
        </span>
      </li>
    );
  });
  return (
    <Container className="mt-5">
      <ul className="container ">
        <li className="row cart-row columnCaptions bg-light">
          <h6 className="col-sm-4">QUANTITY</h6>
          <h6 className="col-sm-4">ITEM</h6>
          <h6 className="col-sm-4">Price</h6>
        </li>
        {list}
        <li className="row cart-row totals bg-light">
          <span className="itemName col-sm-6 text-left">
            Total: <span className="price">{numberFormat(totalPrice/100)}</span>
          </span>
          <span className="col-sm-6 text-right">
            <Link to="/checkout" className="btn-primary btn white-text">
              Checkout
            </Link>
          </span>
        </li>
      </ul>
    </Container>
  );
};

export default cartList;
