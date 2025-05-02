import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../StyleSheets/LoginPage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Card,
  CardContent,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import loginIcon from "../assets/login-icon.png";

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event) => {
    setAdminData({ ...adminData, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!adminData.username || !adminData.password) {
      setErrorMessage("Admin ID and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(adminData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Admin login successful:", data);
        navigate("/dashboard"); // Redirect to the admin dashboard
      } else {
        console.error("Login failed:", data.error);
        setErrorMessage(data.detail || "Login failed. Please try again.");
      }
      
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main font-roboto-mono">
      <div className="login-form-container">
        <Card className="login-form p-8 lg">
          <CardContent>
            <Typography variant="h4" className="text-white font-bold mb-4">
              Admin Login
            </Typography>
            <Typography variant="body1" className="text-white mb-4">
              Welcome back!
            </Typography>
            {errorMessage && (
              <Typography variant="body2" color="error" className="mb-4">
                {errorMessage}
              </Typography>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Typography variant="subtitle2" className="text-white mb-3">
                  Admin ID
                </Typography>
                <TextField
                  fullWidth
                  name="username"
                  placeholder="Enter your Admin ID"
                  value={adminData.username}
                  onChange={handleChange}
                  variant="outlined"
                  className="login-input"
                />
              </div>
              <div>
                <Typography variant="subtitle2" className="text-white mb-2">
                  Password
                </Typography>
                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={adminData.password}
                  onChange={handleChange}
                  variant="outlined"
                  className="login-input"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          className="text-gray-400"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="welcome-section bg-white p-8 rounded-lg shadow-md">
        <Typography variant="h5" className="font-bold mb-4">
          Welcome to Telecom Customer Services
        </Typography>
        <div className="image-container">
          <img src={loginIcon} alt="Telecom Services" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

