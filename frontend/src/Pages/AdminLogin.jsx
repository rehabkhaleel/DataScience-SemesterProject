// AdminLogin.jsx
import React, { useState } from 'react';
import '../StyleSheets/AdminLogin.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with:', adminId, password);
  };

  return (
    <div className="admin-login-container font-roboto-mono">
      <div className="login-form bg-blue-500 p-8 rounded-lg shadow-md">
        <h2 className="text-white text-2xl font-bold mb-4">Admin Login</h2>
        <p className="text-white mb-4">Welcome back!!</p>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Admin ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="input-field"
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            className="login-button bg-blue-700 hover:bg-blue-900 mt-4"
          >
            Login
          </Button>
        </form>
      </div>
      <div className="welcome-section bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome to Telecom Customer Services</h2>
        <div className="image-container">
          <img
            src="https://i.ibb.co/6y4t40F/telecom-image.png" // Replace with your image URL
            alt="Telecom Services"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;