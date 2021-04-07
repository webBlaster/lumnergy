import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../actions/cart.js";
import { Spinner } from "react-bootstrap";
const LumnergyApi = require("lumnergy_api");

const AddToCartButton = ({ item }) => {
  const authInfo = useSelector(state => state.auth);
  const history = useHistory();

  const token = authInfo.authToken;
  const isAuthenticated = authInfo.isAuthenticated;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addToCart = item => {
    if (isAuthenticated) {
      setLoading(true);
      const defaultClient = LumnergyApi.ApiClient.instance;

      const APIKeyAuth = defaultClient.authentications["APIKeyAuth"];
      APIKeyAuth.apiKey = token;

      const apiInstance = new LumnergyApi.CartApi();

      const callback = (error, data, response) => {
        if (response) {
          if (error) {
            setLoading(false);
          } else {
            history.push("/cart");
          }
        } else {
          setLoading(false);
        }
      };
      addItemToCart(item, apiInstance, callback)(dispatch);
    } else {
      history.push("/signin");
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        addToCart(item);
      }}
      disabled={loading}
    >
      {"Add to cart"}
      {loading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        ""
      )}
    </button>
  );
};

export default AddToCartButton;
