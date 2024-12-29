import React, { useState } from "react";
import "../StyleSheets/LoginPage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import loginIcon from "../assets/login-icon.png";
import {
  Card,
  CardContent,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomerLogin = () => {
  const [custData, setCustData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setCustData({ ...custData, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(custData),
      });


      const data = await response.json();

    

      if (response.ok) {
        console.log("Login successful:", data);
        // Handle successful login (e.g., redirect to customer dashboard, store customer data)
      } else {
        console.error("Login failed:", data.error);
        // Show error message to user
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  return (
    <div className="main font-roboto-mono">
      <div className="login-form-container">
        <div className="login-form p-8 lg">
        
          <h2 className="text-white text-5xl font-bold mb-4">Customer Login</h2>
          <p className="text-white mb-4">Welcome back!</p>
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
      <br/>
      <br/>
      <br/>
        <h2 className="text-2xl font-bold mb-4">Welcome to Telecom Customer Services</h2>
        <div className="image-container">
          <img src={loginIcon} alt="Telecom Services" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;