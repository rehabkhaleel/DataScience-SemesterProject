import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import emailjs from "@emailjs/browser";

const CustomerRetention = () => {
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [offers, setOffers] = useState({
    freeMonth: false,
    discount3Months: false,
    loyaltyPoints: false,
    premiumFeatures: false,
    exclusiveAddons: false,
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOfferChange = (event) => {
    setOffers({ ...offers, [event.target.name]: event.target.checked });
  };

  const handleSendOffers = async () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!issue.trim()) {
      alert("Please describe the issue.");
      return;
    }

    if (!Object.values(offers).some((offer) => offer)) {
      alert("Please select at least one offer.");
      return;
    }

    const selectedOffers = Object.entries(offers)
      .filter(([_, checked]) => checked)
      .map(([offerKey]) => {
        switch (offerKey) {
          case "freeMonth":
            return "1 Month Free Subscription";
          case "discount3Months":
            return "20% Discount for 3 Months";
          case "loyaltyPoints":
            return "Loyalty Points";
          case "premiumFeatures":
            return "Premium Features (Extra Speed/Data)";
          case "exclusiveAddons":
            return "Exclusive Add-ons (Streaming/Storage)";
          default:
            return offerKey;
        }
      })
      .join(", ");

    try {
      await emailjs.send(
        "Add Serivice Id", //Add service ID here
        "template ID", //Add template ID here
        {
          email: email,
          issue: issue,
          offer: selectedOffers || "A special offer tailored for you",
        },
        "public api key" // Add public api key
      );

      alert("Offer email sent successfully!");
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <Paper
        elevation={3}
        className="max-w-2xl mx-auto p-8 rounded-xl"
        sx={{ backgroundColor: "#ffffff" }}
      >
        <Typography variant="h5" className="text-3xl font-bold mb-6">
          Customer Retention Panel
        </Typography>

        <TextField
          label="Customer Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Describe the Issue"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />

<Typography variant="h6" className="mb-2 text-[white] font-semibold">
          Special Offers
        </Typography>
        <div className="mb-6 space-y-2">
          <FormControlLabel
            control={
              <Checkbox name="freeMonth" checked={offers.freeMonth} onChange={handleOfferChange} />
            }
            label="Enjoy a free subscription for 1 month on us!"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="discount3Months"
                checked={offers.discount3Months}
                onChange={handleOfferChange}
              />
            }
            label="Enjoy a 20% discount on your subscription for the next 3 months."
          />
          <FormControlLabel
            control={
              <Checkbox
                name="loyaltyPoints"
                checked={offers.loyaltyPoints}
                onChange={handleOfferChange}
              />
            }
            label="Receive loyalty points to redeem on your next bill or for exclusive rewards."
          />
          <FormControlLabel
            control={
              <Checkbox
                name="premiumFeatures"
                checked={offers.premiumFeatures}
                onChange={handleOfferChange}
              />
            }
            label="Enjoy access to premium features like faster speeds or extra data for 2 weeks at no additional cost."
          />
          <FormControlLabel
            control={
              <Checkbox
                name="exclusiveAddons"
                checked={offers.exclusiveAddons}
                onChange={handleOfferChange}
              />
            }
            label="Enjoy exclusive add-ons such as streaming services or additional storage space at no extra cost for a limited time."
          />
        </div>

        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleSendOffers}
          className="bg-green-600 hover:bg-green-700"
        >
          Send Offers
        </Button>
      </Paper>
    </div>
  );
};

export default CustomerRetention;
