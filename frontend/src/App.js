import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelecomPortal from "./Pages/TelecomPortal";
import CustomerLogin from "./Pages/CustomerLogin";
import AdminLogin from "./Pages/AdminLogin";
import FeedbackForm from "./Pages/FeedbackForm"
import DashBoard from "./Pages/DashBoard";
import Services from "./Pages/Services"

const NotFound = () => <h1 style={{ textAlign: "center", marginTop: "50px" }}>Page Not Found</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelecomPortal />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/services" element ={<Services/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/feedback" element={<FeedbackForm/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
