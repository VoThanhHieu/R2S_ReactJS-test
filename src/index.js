import React from "react";
import ReactDOM from "react-dom";
// import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.css";

import "./index.css";
import App from "./App";

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
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
