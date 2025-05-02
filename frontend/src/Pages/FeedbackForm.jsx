import React, { useState, useEffect } from "react";
import "../StyleSheets/FeedbackForm.css"; // Ensure the path to your CSS file is correct
import WifiIcon from "@mui/icons-material/Wifi"; // Ensure Material-UI is installed
import Navbar from "../Components/Navbar"; // Update path if Navbar is in a different folder
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation

const FeedbackForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    customerID: "",
    email: "",
    age: "",
    phoneServices: "",
    internetService: "",
    unlimitedData: "",
    streamingTV: "",
    streamingMovies: "",
    streamingMusic: "",
    complaints: "",
    otherComments: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/feedback/get-customer-id", {
      method: "GET", // Use uppercase "GET"
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.detail || "Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setFormData((prev) => ({ ...prev, customerID: data.customer_id }));
      })
      .catch((err) => {
        console.error("Failed to fetch customer ID", err.message);
      });
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
        })     
        .catch((err) => console.error("Submission failed", err));

      const result = await response.json();
      if (response.ok) {
        alert("Feedback submitted successfully!");
        setFormData({
          customerID: "",
          email: "",
          age: "",
          dissatisfaction: "",
          price: "",
          attitude: "",
          service: "",
          otherComments: "",
        });
      } else {
        alert(result.error || "Failed to submit feedback.");
      }
    } catch (error) {
      alert("An error occurred while submitting feedback. Please try again later.");
      console.error("Error submitting feedback:", error);
    }
  };
  const handleCancel = () => {
    setFormData({
      customerID: "",
      email: "",
      age: "",
      dissatisfaction: "",
      price: "",
      attitude: "",
      service: "",
      otherComments: "",
    });
  };

  const handleLogout = async () => {
  
    try {
      const res = await fetch("http://127.0.0.1:8000/feedback/logout", {
        method: "POST",
        credentials: "include"
      });
  
      if (!res.ok) {
        throw new Error("Logout failed");
      }

      const data = await res.json();
      alert(data.message); // Optional: "Logged out"
      navigate("/customer-login"); // Redirect to login or home page
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="font-roboto-mono">
      <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
        <Toolbar>
          {/* Wifi Icon */}
          <IconButton
            edge="start"
            aria-label="logo"
            sx={{ mr: 2, color: "#1f66b0 !important" }}
          >
            <WifiIcon />
          </IconButton>

          {/* Title */}
          <Typography
            color="textPrimary"
            variant="h6"
            sx={{ flexGrow: 1, color: "#1f66b0" }}
          >
            Telecom Services
          </Typography>

          {/* Navigation Links */}
          <Button
            variant="text"
            size="medium"
            sx={{ ml: 2, color: "#1f66b0" }}
           
          >
            Home
          </Button>
          <Button color="text" sx={{ ml: 2, color: "#1f66b0" }}>
            Services
          </Button>
        </Toolbar>
      </AppBar>

      {/* Feedback Form */}
      <form
        onSubmit={handleSubmit}
        className="feedback-form feedback-form-container"
      >
        <div className="main-sect">
          <h1 className="blue-font">Customer Feedback Form</h1>
          <p>Help us improve our services by providing your feedback</p>
        </div>

        <div className="form-group">
            <label htmlFor="age" className="white-font">Customer ID</label>
            <input
              type="number"
              id="customerID"
              name="customerID"
              value={formData.customerID} readOnly
              onChange={handleChange}
              required
              className="bg-[#80b5d4] width-input"
            />
          </div>

        {/* Email Field */}
        <div className="top-email-age">
          <div className="form-group">
            <label htmlFor="email" className="white-font">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-[#80b5d4] width-input"
            />
          </div>

          {/* Age Field */}
          <div className="form-group">
            <label htmlFor="age" className="white-font">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="bg-[#80b5d4] width-input"
            />
          </div>
        </div>
        <br />

        {/* Complaints Section */}
        <hr />
        <br />
        <h1 className="text-3xl font-bold">Complaints</h1>
        <br />
        {/* Dissatisfaction */}
        <div className="form-group white-font">
          <label>Dissatisfaction</label>
          <div className="form-radio-group white-font">
            <label>
              <input
                type="radio"
                name="dissatisfaction"
                value="Service Dissatisfaction"
                onChange={handleChange}
              />
              Service Dissatisfaction
            </label>
            <label>
              <input
                type="radio"
                name="dissatisfaction"
                value="Product Dissatisfaction"
                onChange={handleChange}
              />
              Product Dissatisfaction
            </label>
            <label>
              <input
                type="radio"
                name="dissatisfaction"
                value="No"
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price</label>
          <div className="form-radio-group">
            <label>
              <input
                type="radio"
                name="price"
                value="High Monthly Charges"
                onChange={handleChange}
              />
              High Monthly Charges
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="Unexpected Fees"
                onChange={handleChange}
              />
              Unexpected Fees
            </label>

            <label>
              <input
                type="radio"
                name="price"
                value="No"
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Customer Service</label>
          <div className="form-radio-group">
            <label>
              <input
                type="radio"
                name="service"
                value="Service Dissatisfaction"
                onChange={handleChange}
              />
              Service Dissatisfaction
            </label>
            <label>
              <input
                type="radio"
                name="service"
                value="Product Dissatisfaction"
                onChange={handleChange}
              />
              Product Dissatisfaction
            </label>
            <label>
              <input
                type="radio"
                name="service"
                value="No"
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Attitude</label>
          <div className="form-radio-group">
            <label>
              <input
                type="radio"
                name="attitude"
                value="Rude Behaviour"
                onChange={handleChange}
              />
              Rude Behaviour
            </label>
            <label>
              <input
                type="radio"
                name="service"
                value="Lack of Politeness"
                onChange={handleChange}
              />
              Lack of Politeness
            </label>
            <label>
              <input
                type="radio"
                name="service"
                value="No"
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {/* Other Comments */}
        <div className="form-group">
          <label htmlFor="otherComments">Other Complains</label>
          <textarea
            id="otherComments"
            name="otherComments"
            rows="1"
            value={formData.otherComments}
            onChange={handleChange}
            className="bg-[#80b5d4]"
          />
        </div>

        {/* Buttons */}
        <div className="feedback-form-buttons justify-end">
        <button type="button" className="Logout-button bg-[#b81e1e]" onClick={handleLogout} >
            Logout
          </button>
          <button type="button" className="cancel-button bg-[#cc5939]" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button bg-[#2ca219]">
            Submit Feedback
          </button>
        </div>
      </form>

    </div>
  );
};

export default FeedbackForm;

