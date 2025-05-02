import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const ChurnPrediction = () => {
  const [customerId, setCustomerId] = useState("");
  const [predictionData, setPredictionData] = useState(null);

  const handleSearch = async () => {
    console.log("Starting handleSearch...");
    try {
      console.log("Sending POST request with CustomerID:", customerId);

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CustomerID: parseInt(customerId, 10) }), 
      });

      console.log("Received response:", response);

      const result = await response.json();
      console.log("Parsed JSON result:", result);

      if (response.ok) {
        console.log("Response OK. Setting prediction data.");
        setPredictionData(result);
      } else {
        console.error("Server responded with error:", result.detail || "Unknown error");
        alert(result.detail || "Failed to fetch prediction.");
      }
    } catch (error) {
      console.error("Error occurred inside try-catch:", error);
      alert("An error occurred while fetching prediction. Please try again later.");
    }
  };

  // rest of your component



  const handleCancel = () => {
    setCustomerId("");
    setPredictionData(null);
  };

  const handleLogout = () => {
    // Implement logout functionality here
  };

  return (
    <div className="min-h-screen p-8">
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 8,
          maxWidth: "lg",
          backgroundColor: "transparent",
        }}
      >
        <Typography
          variant="h5"
          className="mb-6 text-left text-[white] font-bold"
        >
          Customer Lookup
        </Typography>

        <div className="flex space-between mb-12 mt-2">
          <TextField
            label="Enter Customer ID to view predictions"
            variant="outlined"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="mr-6"
          />
          
          <Button
            className="ml-12"
            variant="contained"
            color="success"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </div>

        {predictionData && (
          <div>
            <Typography
              variant="h6"
              className="mb-4 text-white font-semibold"
            >
              Prediction Results
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={2} className="p-4 rounded-lg bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="subtitle1">
                      Churn Probability
                    </Typography>
                    <PersonRemoveIcon className="text-blue-500" />
                  </div>
                  <Typography variant="h5" className="font-bold">
                    {predictionData.churn_probability}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-600 flex items-center mt-1"
                  >
                    Likelihood of customer churning{" "}
                    <TrendingUpIcon className="text-green-500 ml-1" />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={2} className="p-4 rounded-lg bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="subtitle1">Risk Level</Typography>
                    <SentimentVeryDissatisfiedIcon className="text-orange-500" />
                  </div>
                  <Typography
                    variant="h6"
                    className="font-bold"
                    style={{
                      color:
                        predictionData.risk_level === "High"
                          ? "red"
                          : predictionData.risk_level === "Moderate"
                          ? "yellow"
                          : "green",
                    }}
                  >
                    {predictionData.risk_level}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Current customer risk assessment                 
                 </Typography>
                </Paper>
              </Grid>
            </Grid>
          </div>
        )}

        {/* end */}
      </Paper>
    </div>
  );
};

export default ChurnPrediction;
