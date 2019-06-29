import React from "react";
import { render } from "react-dom";

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import { createBrowserHistory } from "history";

import rootReducer from './reducers/rootReducer';
import Root from "./containers/Root.jsx";

import "assets/scss/material-kit-react.scss?v=1.7.0";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const hist = createBrowserHistory();
const store = createStore(
  rootReducer(hist),
  composeEnhancer(applyMiddleware(thunk), applyMiddleware(routerMiddleware(hist)))
);

render(<Root store={store} history={hist} />, document.getElementById("root"));

