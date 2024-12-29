import React, { useState } from "react";
import "../StyleSheets/FeedbackForm.css"; // Ensure the path to your CSS file is correct
import WifiIcon from "@mui/icons-material/Wifi"; // Ensure Material-UI is installed
import Navbar from "../Components/Navbar"; // Update path if Navbar is in a different folder

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div>
      <Navbar />
      {/* Feedback Form */}
      <form
        onSubmit={handleSubmit}
        className="feedback-form feedback-form-container"
      >
        <div className="main-sect">
          <h1>Customer Feedback Form</h1>
          <p>Help us improve our services by providing your feedback</p>
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Age Field */}
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Services */}
        <div className="form-group">
          <label>Phone Services</label>
          <div className="form-radio-group">
            <label>
              <input
                type="radio"
                name="phoneServices"
                value="Yes"
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="phoneServices"
                value="No"
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {/* Complaints */}
        <div className="form-group">
          <label>Complaints</label>
          <div className="form-radio-group">
            <label>
              <input
                type="radio"
                name="complaints"
                value="Service Dissatisfaction"
                onChange={handleChange}
              />
              Service Dissatisfaction
            </label>
            <label>
              <input
                type="radio"
                name="complaints"
                value="Product Dissatisfaction"
                onChange={handleChange}
              />
              Product Dissatisfaction
            </label>
          </div>
        </div>

        {/* Other Comments */}
        <div className="form-group">
          <label htmlFor="otherComments">Other Comments</label>
          <textarea
            id="otherComments"
            name="otherComments"
            rows="4"
            value={formData.otherComments}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="feedback-form-buttons">
          <button type="button" className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
