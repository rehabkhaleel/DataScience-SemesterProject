from pymongo import MongoClient

# MongoDB client setup
client = MongoClient("mongodb://localhost:27017/")
db = client["telecom_database"]

# Collection references
customer_complains_collection = db["Customer_Complains"]
customers_collection = db["customers"]

# Function to create the Customer_Complains table
def setup_customer_complains():
    # Ensure the Customer_Complains collection exists
    if "Customer_Complains" not in db.list_collection_names():
        print("Creating Customer_Complains collection...")

    initial_complains = [
        {
            "ComplainID": 1,
            "CustomerID": "CUST001",
            "Email": "example1@mail.com",
            "Age": 35,
            "Complain_Type_Dissatisfaction": 1,
            "Complain_Type_Price": 0,
            "Complain_Type_Attitude": 0,
            "Complain_Type_Customer_Service": 1,
            "Complain_Type_Other": 0,
            "Other_Complain": "",
            "No_of_Complains": 2,
        },
        {
            "ComplainID": 2,
            "CustomerID": "CUST002",
            "Email": "example2@mail.com",
            "Age": 28,
            "Complain_Type_Dissatisfaction": 0,
            "Complain_Type_Price": 1,
            "Complain_Type_Attitude": 1,
            "Complain_Type_Customer_Service": 0,
            "Complain_Type_Other": 1,
            "Other_Complain": "Long wait times",
            "No_of_Complains": 3,
        },
    ]

    # Insert sample data
    customer_complains_collection.insert_many(initial_complains)
    print("Inserted initial data into Customer_Complains collection.")

if __name__ == "__main__":
    setup_customer_complains()
    print("Setup completed.")