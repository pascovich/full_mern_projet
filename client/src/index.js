import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
// import { configureStore } from '@reduxjs/toolkit';
import { thunk } from "redux-thunk";

import logger from "redux-logger";
import { getUsers } from "./actions/usersActions";
// import {composedWithDevTools} from "redux-devtools-extension"
// const middlewares = [thunk];
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
  // compose(applyMiddleware(thunk, logger))
  // composedWithDevTools(applyMiddleware(thunk,logger))
);
//alternative of createStore
// const store = configureStore({
//   reducer: rootReducer,
// });
store.dispatch(getUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
