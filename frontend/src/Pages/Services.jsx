import React from "react";
import "../StyleSheets/Services.css";
import telecomIcon from "../assets/login-icon.png"; // Replace with your actual icon image path
import { Typography, Card, CardContent } from "@mui/material";

const ServicesPage = () => {
  return (
    <div className="services-page font-roboto bg-red">
      <div className="header-section text-center p-8 backdrop-blur bg-opacity-70 bg-[#1f2937]">
        <img src={telecomIcon} alt="Telecom Icon" className="mx-auto w-20 h-20 mb-4" />
        <Typography variant="h4" className="font-bold text-white">
          Telecom Customer Services Portal
        </Typography>
        <Typography variant="subtitle1" className="mt-2 text-gray-300">
          Simplifying Customer Support for Telecom Industry
        </Typography>
      </div>

      <div className="content-section p-8">
        <Typography variant="h5" className="font-semibold mb-4">
          About the Project
        </Typography>
        <Typography variant="body1" className="text-gray-700 leading-relaxed mb-6">
          The Telecom Customer Services Portal is a modern solution aimed at enhancing customer 
          interactions with telecom service providers. Our portal allows customers to seamlessly log in, 
          access their accounts, and provide valuable feedback. The platform is built with robust features 
          for security, responsiveness, and user-friendliness to ensure a superior customer experience.
        </Typography>

        <Typography variant="h5" className="font-semibold mb-4">
          Our Services
        </Typography>
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="service-card MuiCard-root">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-2">
                Secure Login
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                A secure and user-friendly login interface ensuring customer data privacy and safety.
              </Typography>
            </CardContent>
          </Card>

          <Card className="service-card MuiCard-root">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-2">
                Feedback Management
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Customers can provide feedback, helping telecom providers improve their services.
              </Typography>
            </CardContent>
          </Card>

          <Card className="service-card MuiCard-root">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-2">
                Real-Time Support
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Real-time assistance with customer queries and technical issues through integrated chat.
              </Typography>
            </CardContent>
          </Card>

          <Card className="service-card MuiCard-root">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-2">
                Account Management
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Customers can easily manage their accounts and service preferences online.
              </Typography>
            </CardContent>
          </Card>

          <Card className="service-card MuiCard-root">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-2">
                Responsive Design
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                A mobile-friendly design that ensures accessibility across all devices.
              </Typography>
            </CardContent>
          </Card>

          <Card className="service-card MuiCard-root">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-2">
                Data Security
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Advanced security protocols to keep customer information safe and secure.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
