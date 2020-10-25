import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import reportWebVitals from './reportWebVitals';

// ROUTER
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

// STORE
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
