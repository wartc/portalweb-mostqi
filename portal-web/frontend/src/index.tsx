import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";

import Modal from "react-modal";
import App from "./App";

Modal.setAppElement("#root");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
