import authReducer from './auth.js';
import cartReducer from './cart.js';
import responseReducer from './response.js';
import financingReducer from './financing.js';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    response: responseReducer,
    financing: financingReducer
});

export default rootReducer;