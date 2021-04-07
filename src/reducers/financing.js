import {
    UNCHECKED_FINANCING,
    CHECKED_FINANCING
  } from "../constants.js";
  
  const initialState = {
    optInForFinancing: false
  };
  
  const financingReducer = (state = initialState, action) => {
    switch (action.type) {
      case UNCHECKED_FINANCING:
      return { optInForFinancing: false }
      case CHECKED_FINANCING:
      return { optInForFinancing: true }
      default:
        return state;
    }
  };
  
  export default financingReducer;