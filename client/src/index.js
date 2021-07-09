import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import rootSaga from "./sagas";
import reducers from "./reducers";
import App from "./components/App";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import "./i18n";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = window.location.origin + "/api";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
