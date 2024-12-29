from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["telecom_db"]

# Define collections
customers_collection = db["customers"]
customer_login_collection = db["customer_login"]
admin_login_collection = db["admin_login"]

# Clear collections if they already exist
customers_collection.delete_many({})
customer_login_collection.delete_many({})
admin_login_collection.delete_many({})

# Define basic data for the Customer collection
sample_customers = [
    {
        "CustomerID": 3598,
        "Gender": "Male",
        "Age": 30,
        "Number of Referrals": 2,
        "Tenure in Months": 12,
        "Phone Service": "Yes",
        "Multiple Lines": "No",
        "Internet Service": "Yes",
        "Internet Type": "Fiber Optic",
        "Unlimited Data": "Yes",
        "Average Monthly GB Download": 50.0,
        "Streaming TV": "Yes",
        "Streaming Movies": "No",
        "MonthlyCharges": 75.5,
        "No. of Complains": 3,
        "Contract": "Month-to-Month",
        "Payment Method": "Credit Card",
        "Offer": "Offer A",
        "Total Refunds": 0,
        "Total Extra Data Charges": 20,
        "Total Long Distance Charges": 320
    }
]

# Insert data into the Customer collection
customers_collection.insert_many(sample_customers)

# Define basic data for the Customer Login collection
customer_login_data = [
    {"CustomerID": "CUST1", "Password": "cust1pass"}
]

customer_login_collection.insert_many(customer_login_data)

# Define basic data for the Admin Login collection
admin_login_data = [
    {"AdminID": "admin1", "Password": "admin1pass"}
]

# Insert data into the Admin Login collection
admin_login_collection.insert_many(admin_login_data)

print("MongoDB setup completed: Customers, Customer Login, and Admin Login collections populated with basic values.")
