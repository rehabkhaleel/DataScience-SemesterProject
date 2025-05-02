from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests  # synchronous HTTP client
from database.connections import get_database

predict_router = APIRouter()
db = get_database()
customers_collection = db["Customers"]

# Input model for customer ID
class CustomerRequest(BaseModel):
    CustomerID: int

@predict_router.post("/")
def churn_prediction(request: CustomerRequest):
    customer_id = request.CustomerID

    # Fetch raw customer document
    customer_data = customers_collection.find_one({"CustomerID": customer_id})
    if not customer_data:
        raise HTTPException(status_code=404, detail="Customer not found")

    # Remove MongoDB internal _id field
    customer_data.pop("_id", None)

    # Send raw data to prediction backend
    try:
        response = requests.post(
            "http://localhost:8001/predict",  # Your model server endpoint
            json=customer_data,
            timeout=5  # Optional timeout for robustness
        )
        response.raise_for_status()
        prediction_data = response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Model server error: {str(e)}")

    return {
        "CustomerID": customer_id,
        "Prediction": prediction_data.get("Prediction"),
        "churn_probability": prediction_data.get("churn_probability"),
        "risk_level": prediction_data.get("risk_level")
    }
