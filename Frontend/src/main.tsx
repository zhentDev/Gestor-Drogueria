import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </Router>
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
