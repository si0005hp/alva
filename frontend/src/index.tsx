import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router } from "react-router";
import rootSaga from "./sagas/note";
import { composeWithDevTools } from "redux-devtools-extension";
// import noteReducer from "./reducers/note";
import rootReducer from "./reducers";

const history = createBrowserHistory();
const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
  rootReducer(),
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

sagaMiddleWare.run(rootSaga);
