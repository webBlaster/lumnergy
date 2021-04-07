import React from "react";
import { numberFormat } from "../../utils.js";
const checkOutList = ({ items }) => {
  const list = items.map(item => {
    return (
      <li
        className="list-group-item d-flex justify-content-between lh-condensed"
        key={item.item.id}
      >
        <div>
          <h6 className="my-0">{item.item.title}</h6>
        </div>
        <span className="text-muted">{numberFormat(item.item.price/ 100)}</span>
      </li>
    );
  });
  return (
    <React.Fragment>
      <h4 className="text-center justify-content-between align-items-center mb-3">
        <span className="text-muted">Cart</span>
      </h4>
      <ul className="list-group mb-3">
        {list}
        <li className="list-group-item d-flex justify-content-between">
          <span>Total (NG)</span>
          <strong>{items[0] ? numberFormat( items[0].item.price / 100) : ""}</strong>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default checkOutList;
