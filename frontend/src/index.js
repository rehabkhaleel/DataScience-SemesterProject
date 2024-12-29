import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import FeedbackForm from './Pages/FeedbackForm'
import reportWebVitals from "./reportWebVitals"; // Ensure the default import

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FeedbackForm/>
  </React.StrictMode>
);
