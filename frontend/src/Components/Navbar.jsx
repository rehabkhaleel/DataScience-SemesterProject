import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 240px)`, // Adjust for the drawer width
        ml: "240px", // Offset the content to the right
        backgroundColor: "#2184bd",
        boxShadow: "none",
        width:'100%',
      }}
    >
      <Toolbar>
        <IconButton edge="start" aria-label="logo" sx={{ mr: 2, color: "white" }}>
          <WifiIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Telecom Services
        </Typography>
        <Button variant="text" size="medium" sx={{ ml: 2, color: "white" }}>
          Home
        </Button>
        <Button variant="text" size="medium" sx={{ ml: 2, color: "white" }}>
          Services
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
