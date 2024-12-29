import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import Navbar from "../Components/Navbar";
import CustomerComplaints from "../Components/CustomerComplaint";
import ChurnPrediction from "../Components/ChurnPrediction";
import CustomerRetention from "../Components/CustomerRetention";

const drawerWidth = 240;

export default function DashBoard() {
  const [selectedComponent, setSelectedComponent] = React.useState(null);

  const handleButtonClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <Box className='font-roboto'  sx={{ display: "flex", minHeight: "100vh", flexDirection: "column"}}>
      <CssBaseline />
      <Navbar />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundImage:
                "linear-gradient(to bottom, #b8d2e9 30%, #056EA9 100%)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              color: "white",
              top: "64px",
              height: "calc(100vh - 64px)", // Occupy full height minus navbar
              overflowY: "auto", // Add scroll if content overflows
              
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {/* Use a Box or div for better styling control */}
          <Box sx={{ p: 2 }}> {/* Add padding inside the drawer for content */}
            <Button
              variant="contained"
              fullWidth // Make buttons take full width of drawer
              sx={{
                color: "black",
                backgroundColor: "white",
                mb: 4, // Consistent margin bottom
                mt:4,
              }}
              startIcon={<SupportAgentIcon />}
              onClick={() => handleButtonClick("complaints")}
            >
              Customer Complaints
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{
                color: "black",
                backgroundColor: "white",
                
                mb: 4,
              }}
              startIcon={<AssessmentIcon />}
              onClick={() => handleButtonClick("churnPrediction")}
            >
              Churn Prediction
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{
                color: "black",
                backgroundColor: "white",
              }}
              startIcon={<PeopleAltIcon />}
              onClick={() => handleButtonClick("customerRetention")}
            >
              Customer Retention
            </Button>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "transparent",
            p: 2, // Reduced padding to 3
            ml: '30px',
            mt: "64px",
            height: "calc(100vh - 64px)", // Match content height to viewport
            overflowY: "auto", // Add scroll if content overflows

          }}
        >
          {selectedComponent === "complaints" && <CustomerComplaints />}
          {selectedComponent === "churnPrediction" && <ChurnPrediction />}
          {selectedComponent === "customerRetention" && <CustomerRetention />}
        </Box>
      </Box>
    </Box>
  );
}