import {
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  LOGIN_USER_SUCCESSFUL,
  LOGIN_USER_FAILED,
  RESPONSE_SUCCESS_MESSAGE,
  RESPONSE_ERROR_MESSAGE,
} from "../constants.js";

export const registerUser = (apiInstance, customer, callback) => {
  return (dispatch) => {
    const _callback = function (error, data, response) {
      if (error) {
        dispatch({ type: REGISTER_USER_FAILED, payload: null });
        dispatch({
          type: RESPONSE_ERROR_MESSAGE,
          payload: response ? response.body.message : "An error has occured",
        });
      } else {
        dispatch({
          type: REGISTER_USER_SUCCESSFUL,
          payload: response.body.data,
        });
        dispatch({
          type: RESPONSE_SUCCESS_MESSAGE,
          payload: response.body.message,
        });
      }

      callback(error, data, response);
    };

    apiInstance.accountRegisterPost(customer, _callback);
  };
};

export const signInUser = (apiInstance, customerLoginInformation, callback) => {
  return (dispatch) => {
    const _callback = function (error, data, response) {
      if (error) {
        dispatch({ type: LOGIN_USER_FAILED, payload: null });
        dispatch({
          type: RESPONSE_ERROR_MESSAGE,
          payload: response ? response.body.message : "An error has occured",
        });
      } else {
        dispatch({ type: LOGIN_USER_SUCCESSFUL, payload: response.body.data });
      }

      callback(error, data, response);
    };

    apiInstance.accountLoginPost(customerLoginInformation, _callback);
  };
};
