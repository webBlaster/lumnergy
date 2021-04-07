import React from 'react';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import App from './App';
import { Provider } from "react-redux";

test('renders home with other links', () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  const { getByText } = render(<Provider store={store}><App store={store} /></Provider>);
  const linkElement = getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
