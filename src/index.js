import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
//Provider로 감싸줘야함
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
