import React from "react";
import ReactDOM from "react-dom";
// import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.css";
import "flag-icon-css/css/flag-icons.css";

import "./index.css";
import App from "./App";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store/index";

toast.configure({
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  rtl: false,
  progress: undefined,
  theme: "colored",
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
