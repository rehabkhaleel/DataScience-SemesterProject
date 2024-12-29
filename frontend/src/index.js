import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TelecomPortal from './Pages/TelecomPortal';
import CustomerLogin from './Pages/CustomerLogin';
import AdminLogin from './Pages/AdminLogin';
import FeedbackForm from './Pages/FeedbackForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
{/* <TelecomPortal/> */}
    <AdminLogin/> \
  </React.StrictMode>
);

