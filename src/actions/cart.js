import {
  GET_CART_SUCCESSFUL,
  GET_CART_FAILED,
  DELETE_CART_SUCCESSFUL,
  DELETE_CART_FAILED,
  RESPONSE_SUCCESS_MESSAGE,
  RESPONSE_ERROR_MESSAGE
} from "../constants.js";

export const getCartItems = (apiInstance, callback) => {
  return dispatch => {
    const _callback = function(error, data, response) {
      if (error) {
        dispatch({ type: GET_CART_FAILED, payload: null });
      } else {
        dispatch({ type: GET_CART_SUCCESSFUL, payload: response.body.data });
      }

      callback(error, data, response);
    };

    apiInstance.cartGet(_callback);
  };
};

export const deleteCartItems = (cartItemId, apiInstance, callback) => {
  return dispatch => {
    const _callback = function(error, data, response) {
      if (error) {
        dispatch({ type: DELETE_CART_FAILED, payload: null });
        dispatch({
            type: RESPONSE_ERROR_MESSAGE,
            payload: response ? response.body.message : "An error has occured"
          });
      } else {
        dispatch({ type: DELETE_CART_SUCCESSFUL, payload: response.body.data });
        dispatch({
            type: RESPONSE_SUCCESS_MESSAGE,
            payload: response.body.message
          });
      }

      callback(error, data, response);
    };

    apiInstance.cartCartItemIdRemovePost(cartItemId, _callback);
  };
};

export const addItemToCart = (item, apiInstance, callback) => {
  return dispatch => {
    const _callback = function(error, data, response) {
      if (error) {
        dispatch({
            type: RESPONSE_ERROR_MESSAGE,
            payload: response ? response.body.message : "An error has occured"
          });
      } else {
        dispatch({
            type: RESPONSE_SUCCESS_MESSAGE,
            payload: response.body.message
          });
      }

      callback(error, data, response);
    };
    apiInstance.cartPost({ quantity: 1, ...item }, _callback);
  };
};
