import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './CustomerLogin.css';

const CustomerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage("Customer ID and password are required.");
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        setErrorMessage('');
        // Handle successful login (e.g., redirect to dashboard)
      } else {
        console.error("Login failed:", data.error);
        setErrorMessage(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#bab2fa] to-[#a39eca]">
      <Card className="login-card">
        <CardContent className="p-8 bg-white">
          <Typography variant="h4" className="text-[#201574] font-medium mb-1">
            Customer Login
          </Typography>
          <Typography variant="body2" className="text-[#473d99] mb-6">
            Welcome back!
          </Typography>

          {errorMessage && (
            <Typography variant="body2" color="error" className="mb-4">
              {errorMessage}
            </Typography>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Typography variant="subtitle2" className="text-[#473d99] mb-2">
                Customer ID
              </Typography>
              <TextField
                fullWidth
                name="username"
                placeholder="Enter your Customer ID"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                className="login-input"
              />
            </div>

            <div>
              <Typography variant="subtitle2" className="text-[#473d99] mb-2">
                Password
              </Typography>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
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
  );
};

export default CustomerLogin;

