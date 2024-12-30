from faker import Faker
import random
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["telecom_database"]
customers_collection = db["customers"]
login_collection = db["customer_logins"]

# Initialize Faker
fake = Faker()

# Generate Customer Data (200 rows)
def generate_customer_data():
    data = []
    for _ in range(200):  # Generate 200 records
        tenure = random.randint(1, 72)
        phone_service = random.choice(["Yes", "No"])
        internet_service = random.choice(["Yes", "No"])
        
        # Derived fields
        multiple_lines = "No" if phone_service == "No" else random.choice(["Yes", "No"])
        internet_type = "No internet" if internet_service == "No" else random.choice(["Fiber Optic", "DSL"])
        unlimited_data = "No" if internet_service == "No" else random.choice(["Yes", "No"])
        avg_monthly_gb = 0 if internet_service == "No" else random.randint(40, 60)
        
        streaming_tv = "No" if internet_service == "No" else random.choice(["Yes", "No"])
        streaming_movies = "No" if internet_service == "No" else random.choice(["Yes", "No"])
        streaming_music = "No" if internet_service == "No" else random.choice(["Yes", "No"])
        
        monthly_charges = random.uniform(20, 110)
        total_charges = monthly_charges * tenure
        total_refunds = random.choice([0] * 90 + [20, 40, 60, 80, 100])  # Mostly 0
        total_extra_data_charges = 0 if unlimited_data == "Yes" or internet_service == "No" else random.choice([0] * 90 + [20, 40, 70])
        total_long_distance_charges = 0 if phone_service == "No" else random.randint(50, 900) if multiple_lines == "Yes" else random.randint(20, 500)
        
        contract = (
            "Month-to-Month" if tenure < 12
            else "Two Year" if tenure > 20 and random.random() < 0.1
            else "One Year"
        )
        offer = random.choice(["Offer A", "Offer B", "Offer C", "Offer D", "Offer E", "No offer"])
        
        # Complaints
        complaints_count = random.randint(0, 4) if tenure < 12 else random.randint(0, 10)
        complaint_types = {
            "Complain_Type_Dissatisfaction": 0,
            "Complain_Type_Price": 0,
            "Complain_Type_Attitude": 0,
            "Complain_Type_Other": 0,
            "Complain_Type_Customer_Service": 0
        }
        
        for _ in range(complaints_count):
            key = random.choice(list(complaint_types.keys()))
            complaint_types[key] = min(1, complaint_types[key] + 1)
        
        # If no complaints, ensure all complaint types are 0
        if complaints_count == 0:
            complaint_types = {k: 0 for k in complaint_types}

        # Payment Method Logic
        payment_method_choice = random.choice(["Credit Card", "Cash"])
        if random.random() < 0.1:  # 10% chance of having both Credit Card and Mailed Check
            payment_method_choice = ["Credit Card", "Mailed_Check"]
        else:
            payment_method_choice = [payment_method_choice]

        data.append({
            "CustomerID": random.randint(1000, 9999),
            "Gender": random.choice(["Male", "Female"]),
            "Age": random.randint(18, 77),
            "Number_of_Referrals": random.choices(range(0, 8), weights=[70, 20, 5, 2, 1, 1, 0.5, 0.5], k=1)[0],
            "Tenure_in_Months": tenure,
            "Phone_Service": phone_service,
            "Multiple_Lines": multiple_lines,
            "Internet_Service": internet_service,
            "Internet_Type": internet_type,
            "Unlimited_Data": unlimited_data,
            "Average_Monthly_GB_Download": avg_monthly_gb,
            "Streaming_TV": streaming_tv,
            "Streaming_Movies": streaming_movies,
            "Streaming_Music": streaming_music,
            "MonthlyCharges": round(monthly_charges, 2),
            "TotalCharges": round(total_charges, 2),
            "TotalRefunds": total_refunds,
            "TotalExtraDataCharges": total_extra_data_charges,
            "TotalLongDistanceCharges": total_long_distance_charges,
            "Contract": contract,
            "Offer": offer,
            "No_of_Complains": complaints_count,
            **complaint_types,
            "Payment_Method": payment_method_choice
        })
    
    return data

# Generate Login Data
def generate_login_data(customer_ids):
    return [{"CustomerID": customer_id, "Password": "talha123"} for customer_id in customer_ids]

# Generate customer data and insert it
customer_data = generate_customer_data()
customers_collection.insert_many(customer_data)

# Extract CustomerIDs and generate login data
customer_ids = [customer["CustomerID"] for customer in customer_data]
login_data = generate_login_data(customer_ids)
login_collection.insert_many(login_data)

print("Customer and login data generation completed for 200 rows!")
