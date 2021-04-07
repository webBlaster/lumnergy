import {
    RESPONSE_SUCCESS_MESSAGE,
    RESPONSE_ERROR_MESSAGE
  } from "../constants.js";

export const getOrders = (apiInstance, callback) => {
    return (dispatch) => {
        const _callback = function(error, data, response) {
            callback(error, data, response);
        }
        apiInstance.ordersGet(_callback);
    }
}

export const addOrderItem = (body, apiInstance, callback) => {
    return (dispatch) => {
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
        }
        apiInstance.ordersPost(body, _callback);
    }
}