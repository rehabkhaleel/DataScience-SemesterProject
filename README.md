# Telecom Customer Churn Prediction Model

This is a semester project aimed at predicting customer churn and enhancing customer retention for a telecom company. The application is developed using React (frontend) and FastAPI (backend), integrated with a machine learning model based on LightGBM.

---

## Features

### Customer Side
- **Customer Login**: A secure login page for customers to access their profiles.
- **Customer Service Form**: Customers can fill out a form with their service-related details to predict churn.
- **Automated Email Response**: After a churn prediction, an automated email is sent to the customer using `email.js`, providing offers to retain them.

### Admin Side
- **Admin Login**: Admin users can log in to the system.
- **Load and View Complaints**: Admins can load customer complaints from the MongoDB database.
- **Run Predictions**: Admins can run churn predictions based on customer data.
- **Customer Retention Management**: Admins can trigger retention emails to customers based on the prediction results.

---

## Architecture

### Frontend (React)
The user interface of the app is built with React.

### Backend (FastAPI - Main)
FastAPI is used for the main API handling customer data and authentication.

### Prediction Backend (FastAPI + LightGBM)
The prediction backend is also built with FastAPI and uses the LightGBM machine learning model for churn predictions.

### Database (MongoDB)
Customer complaints are stored in MongoDB, either locally or using MongoDB Atlas for remote database management.

### Emailing (email.js)
The client-side email.js library sends automated retention emails to customers after predictions.

---

## How It Works

1. **Customer Login**: Customers log in to the platform to access their service details.
2. **Fill Service Form**: Customers fill in their details in a service form. This data is saved in MongoDB (local or remote).
3. **Admin Login**: Admin users log in to the system to access complaints and customer data.
4. **Run Predictions**: Admins use the backend to run churn predictions using the machine learning model.
5. **Retention Email**: If the churn probability is high, the system sends an automated email with offers to the customer.

---

## Setup Instructions

### Frontend (React)
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```


### Backend (FastAPI - Main)

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```
### Prediction Backend (FastAPI + LightGBM)

```
# Navigate to the prediction backend directory
cd prediction-backend

# Install dependencies
pip install -r requirements.txt

# Run the prediction backend
uvicorn app:app --reload
```

### MongoDB

Use MongoDB Compass or a local instance to manage your MongoDB database.

- A `database` folder is created inside the `backend` directory.
- It contains a `connections.py` file where the MongoDB connection string is defined.
- To set up the database, simply update the connection string in `connections.py` with your own MongoDB URI.
- Make sure that the column names in your form data match those expected by the database and the prediction model to avoid any errors.

### Emailing (email.js)

email.js is used to send automated emails to customers with offers to retain them.

Make sure to configure the email settings in the backend.

