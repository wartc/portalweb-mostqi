import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";

import Modal from "react-modal";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

Modal.setAppElement("#root");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
