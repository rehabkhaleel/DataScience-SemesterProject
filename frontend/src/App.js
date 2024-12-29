import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelecomPortal from "./Pages/TelecomPortal";
import CustomerLogin from "./Pages/CustomerLogin";
import AdminLogin from "./Pages/AdminLogin";

function App() {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<TelecomPortal />} />
  <Route path="/admin-login" element={<AdminLogin />} />
  <Route path="/customer-login" element={<CustomerLogin />} />

  <Route path="*" element={<h1>Page Not Found</h1>} />
</Routes>

    </Router>
  );
}

export default App;
