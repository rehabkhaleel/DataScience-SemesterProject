import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Container } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor:'#b0dcf6' }}>
      <Toolbar>
        {/* Wifi Icon */}
        <IconButton edge="start" aria-label="logo" sx={{ mr: 2,color:'1f66b0 !important' }}>
          <WifiIcon />
        </IconButton>

        {/* Title */}
        <Typography color="textPrimary" variant="h6" sx={{ flexGrow: 1 ,color:'#1f66b0'}}>
          Telecom Services
        </Typography>

        {/* Navigation Links */}
        <Button  variant="text" color="Primary" sx={{ ml: 2,color:'#1f66b0'}}>
          Home
        </Button>
        <Button color="text" sx={{ ml: 2 ,color:'#1f66b0'}}>
          Services
        </Button>
      
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
