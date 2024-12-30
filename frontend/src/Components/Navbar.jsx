import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import { Link } from "react-router-dom"; // Import Link for navigation

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 240px)`, 
        ml: "240px", 
        backgroundColor: "#2184bd",
        boxShadow: "none",
        width: "100%",
      }}
    >
      <Toolbar>
        <IconButton edge="start" aria-label="logo" sx={{ mr: 2, color: "white" }}>
          <WifiIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Telecom Services
        </Typography>
        <Button
          component={Link} // Use Link for navigation
          to="/" // Path for Home page
          variant="text"
          size="medium"
          sx={{ ml: 2, color: "white" }}
        >
          Home
        </Button>
        <Button
          component={Link} // Use Link for navigation
          to="/services" // Path for Services page
          variant="text"
          size="medium"
          sx={{ ml: 2, color: "white" }}
        >
          Services
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
