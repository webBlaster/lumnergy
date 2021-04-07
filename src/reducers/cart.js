import { GET_CART_SUCCESSFUL, GET_CART_FAILED, DELETE_CART_SUCCESSFUL, DELETE_CART_FAILED } from "../constants.js";

const initialState = {
  items: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_SUCCESSFUL:
      return { items: action.payload };
    case GET_CART_FAILED:
      return state;
    case DELETE_CART_SUCCESSFUL:
      return { items:action.payload };
    case DELETE_CART_FAILED:
      return { items:action.payload };
    default:
      return state;
  }
};

export default cartReducer;
