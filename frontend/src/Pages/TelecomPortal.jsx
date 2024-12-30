import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import "../StyleSheets/TelecomPortal.css";
import adminIcon from "../assets/admin-icon.png";
import customerIcon from "../assets/customer-icon.png";
import { Link } from "react-router-dom";

const TelecomPortal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 flex items-center justify-center font-roboto-mono">
      <Container maxWidth="lg" className="text-center py-20">
        <Typography variant="h3" component="h3" className="text-white mb-2">
          Telecom Customer Services
        </Typography>
        <br />
        <Typography variant="h4" className="text-white/90 mb-16">
          Portal Selection
        </Typography>
        <br />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Admin Card */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="flex flex-col items-center p-8">
              <img src={adminIcon} alt="Admin Icon" />
              <Typography variant="h5" className="text-white mb-2">
                Admin
              </Typography>
              <Typography variant="body2" className="text-white/80 mb-6">
                Access administration tools and manage the system
              </Typography>
              <br />
              <Link to="/admin-login" className="w-full no-underline">
                <Button
                  variant="contained"
                  color="primary"
                  className="w-full"
                  component={Link}
                  to="/admin-login" // Correct routing path
                >
                  Enter Admin Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Customer Card */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="flex flex-col items-center p-8">
              <img src={customerIcon} alt="Customer Icon" />
              <Typography variant="h5" className="text-white mb-2">
                Customer
              </Typography>
              <Typography variant="body2" className="text-white/80 mb-6">
                Access your account and manage your services
              </Typography>
              <br />
              <Link to="/customer-login" className="w-full no-underline">
                <Button
                  variant="contained"
                  color="success"
                  className="w-full bg-green-600 hover:bg-green-700"
                  component={Link}
                  to="/customer-login" // Correct routing path
                >
                  Enter Customer Portal
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default TelecomPortal;
