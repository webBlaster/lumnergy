import './custom.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from './reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import { getAuthInfo } from './utils.js';
import { LOGIN_USER_FAILED, LOGIN_USER_SUCCESSFUL } from './constants';
import { createBrowserHistory } from 'history';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

let middleware = (process.env.NODE_ENV === 'production') ? applyMiddleware(thunk) : applyMiddleware(logger, thunk);
const store = createStore(rootReducer, middleware);
const history = createBrowserHistory();

// Initialize sentry.
Sentry.init({
  dsn: "https://ce02b6468e9346b099930e4fb516e6cb@o463219.ingest.sentry.io/5468078",
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  tracesSampleRate: 1.0,
});


// Load store with authInfo if available.
let authInfo = getAuthInfo();
if (authInfo && Object.keys(authInfo).length) {
  store.dispatch(
    {type: LOGIN_USER_SUCCESSFUL, payload: authInfo}
  )
} else {
  store.dispatch(
    {type: LOGIN_USER_FAILED}
  );
}

const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
if (path) {
  history.replace(path);
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();