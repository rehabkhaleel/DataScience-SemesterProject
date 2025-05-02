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
    console.log(`Button clicked: ${component}`);
    setSelectedComponent(component);
  };

  console.log("Rendering Dashboard...");
  console.log("Currently selected component:", selectedComponent);

  return (
    <Box className="font-roboto" sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
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
              backgroundImage: "linear-gradient(to bottom, #b8d2e9 30%, #056EA9 100%)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              color: "white",
              top: "64px",
              height: "calc(100vh - 64px)",
              overflowY: "auto",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box sx={{ p: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ color: "black", backgroundColor: "white", mb: 4, mt: 4 }}
              startIcon={<SupportAgentIcon />}
              onClick={() => handleButtonClick("complaints")}
            >
              Customer Complaints
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ color: "black", backgroundColor: "white", mb: 4 }}
              startIcon={<AssessmentIcon />}
              onClick={() => handleButtonClick("churnPrediction")}
            >
              Churn Prediction
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ color: "black", backgroundColor: "white" }}
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
            p: 2,
            mt: "64px",
            height: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          {!selectedComponent && (
            <Box sx={{ textAlign: "center", mt: 10, color: "gray" }}>
              <h2>Welcome to the Dashboard</h2>
              <p>Select an option from the sidebar to begin.</p>
            </Box>
          )}

          {selectedComponent === "complaints" && (
            <>
              {console.log("Rendering CustomerComplaints Component")}
              <CustomerComplaints />
            </>
          )}
          {selectedComponent === "churnPrediction" && (
            <>
              {console.log("Rendering ChurnPrediction Component")}
              <ChurnPrediction />
            </>
          )}
          {selectedComponent === "customerRetention" && (
            <>
              {console.log("Rendering CustomerRetention Component")}
              <CustomerRetention />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
