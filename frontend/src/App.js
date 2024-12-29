import React from "react";
import { Routes, Route } from "react-router-dom";
import TelecomPortal from "./Pages/TelecomPortal";
import CustomerLogin from "./Pages/CustomerLogin";
import AdminLogin from "./Pages/AdminLogin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TelecomPortal />} />
      <Route path="/customer-login" element={<CustomerLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  );
};

export default App;
