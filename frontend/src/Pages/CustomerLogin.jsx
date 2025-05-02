import React, { useState } from "react";
import "../StyleSheets/LoginPage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import loginIcon from "../assets/login-icon.png";

const CustomerLogin = () => {
  const [custData, setCustData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCustData({ ...custData, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!custData.username || !custData.password) {
      setErrorMessage("Username and password are required.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/customer/login", {  // Change from port 5000 to 8000
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(custData),
      });      

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        navigate("/feedback"); // Redirect to the feedback page
      } else {
        console.error("Login failed:", data.error);
        setErrorMessage(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Unable to connect to the server. Please try again.");
    }
  };

  return (
    <div className="main font-roboto-mono">
      <div className="login-form-container">
        <div className="login-form p-8 lg">
          <h2 className="text-white text-5xl font-bold mb-4">Customer Login</h2>
          <p className="text-white mb-4">Welcome back!</p>
          {errorMessage && (
            <Typography variant="body2" color="error" className="mb-4">
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Typography variant="subtitle2" className="text-[#ffffff] mb-3">
                Username
              </Typography>
              <TextField
                fullWidth
                name="username"
                placeholder="example@gmail.com"
                value={custData.username}
                onChange={handleChange}
                variant="outlined"
                className="login-input"
              />
            </div>
            <div>
              <Typography variant="subtitle2" className="text-[#ffffff] mb-2">
                Password
              </Typography>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                value={custData.password}
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
            <Button type="submit" variant="contained" fullWidth className="login-button">
              Login
            </Button>
          </form>
        </div>
      </div>
      <div className="welcome-section bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome to Telecom Customer Services</h2>
        <div className="image-container">
          <img src={loginIcon} alt="Telecom Services" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;

