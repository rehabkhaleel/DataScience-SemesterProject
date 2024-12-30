import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ServicesPage from "./Pages/Services";
import  Dashboard  from "./Pages/DashBoard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
