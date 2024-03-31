import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import OnchangeClient from "./OnchangeClient/OnchangeClient.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* code in app shows onclick socket connection */}
    <App />
    {/* code in app shows onchange socket connection */}

    <OnchangeClient />
  </React.StrictMode>
);
