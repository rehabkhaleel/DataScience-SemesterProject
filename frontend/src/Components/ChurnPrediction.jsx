import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const ChurnPrediction = () => {
  const [customerId, setCustomerId] = useState("");
  const [predictionData, setPredictionData] = useState(null);

  const handleSearch = () => {
    // Replace with your actual API call or data fetching logic
    // This is sample data for setting frontend, replace it with API to handle/bring data from the model
    setPredictionData({
      churnProbability: 78,
      riskLevel: "High",
      retentionScore: 42,
      monthlyRevenue: 128.5,
    });
  };

  return (
    <div className=" min-h-screen p-8 ">
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
          className="ml-12 "
            variant="contained"
            color="success"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </div>
{/* From below the backend would generate stuff to show as end result :start */}
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
                    {predictionData.churnProbability}%
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
                  <Typography variant="h6" className="font-bold">
                    {predictionData.riskLevel}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Current customer risk assessment
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={2} className="p-4 rounded-lg bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="subtitle1">Retention Score</Typography>
                    <LoyaltyIcon className="text-green-500" />
                  </div>
                  <Typography variant="h5" className="font-bold">
                    {predictionData.retentionScore}/100
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-600 flex items-center mt-1"
                  >
                    Customer loyalty index{" "}
                    <TrendingDownIcon className="text-red-500 ml-1" />
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={2} className="p-4 rounded-lg bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="subtitle1">Monthly Revenue</Typography>
                    <AttachMoneyIcon className="text-yellow-500" />
                  </div>
                  <Typography variant="h5" className="font-bold">
                    ${predictionData.monthlyRevenue}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-600 flex items-center mt-1"
                  >
                    Average monthly spending{" "}
                    <TrendingDownIcon className="text-red-500 ml-1" />
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
