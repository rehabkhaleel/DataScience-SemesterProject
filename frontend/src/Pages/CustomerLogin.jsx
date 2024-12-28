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
import '../StyleSheets/CustomerLogin.css';

const CustomerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here plsss!
    console.log('Login attempted with:', formData);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#bab2fa] to-[#a39eca]">
      <Card className="login-card">
        <CardContent className="p-8 bg-white">
        <br/>
          <Typography variant="h4" className="text-[#201574] font-medium mb-1">
            Customer Login
          </Typography>
          
          <Typography variant="body2" className="text-[#473d99] mb-6">
            Welcome back!!
          </Typography>
          <br/>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Typography variant="subtitle2" className="text-[#473d99] mb-2">
                Username
              </Typography>
              <TextField
                fullWidth
                name="username"
                placeholder="example@gmail.com"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                className="login-input"
              />
            </div>
<br></br>
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
<br/>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="login-button"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerLogin;

