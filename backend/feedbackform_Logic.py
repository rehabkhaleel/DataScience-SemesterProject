from fastapi import FastAPI, APIRouter, HTTPException, status, Request
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from typing import Optional
from database.connections import get_database
from fastapi import Cookie
import logging

app = FastAPI()

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)
db = get_database()
customer_complains_collection = db["Customer_Complains"]
customers_collection = db["Customers"]


feedback_form_router = APIRouter()

class Feedback(BaseModel):
    email: str
    age: int
    dissatisfaction: Optional[str] = None
    price: Optional[str] = None
    attitude: Optional[str] = None
    service: Optional[str] = None
    otherComments: Optional[str] = None

def get_next_complain_id():
    last_complain = customer_complains_collection.find_one(sort=[("ComplainID", -1)])
    return (last_complain["ComplainID"] + 1) if last_complain else 1

@feedback_form_router.get("/get-customer-id")
async def get_customer_id(request: Request):
    logger.info("🔍 /get-customer-id endpoint hit")  # Log that the endpoint is triggered

    # Log cookies from headers (for debugging)
    cookie_header = request.headers.get("cookie")
    logger.info(f"💡 Cookie in request headers: {cookie_header}")

    # Log cookies from request.cookies (parsed by FastAPI)
    logger.info(f"💡 Parsed cookie keys: {list(request.cookies.keys())}")
    logger.info(f"💡 Parsed all cookies: {request.cookies}")

    customer_id = request.cookies.get("customer_id")
    if not customer_id:
        logger.warning("❌ No customer_id found in cookies.")
        raise HTTPException(status_code=404, detail="Customer not found")

    logger.info(f"✅ Found customer_id in cookie: {customer_id}")

    try:
        customer_id = int(customer_id)
    except ValueError:
        logger.error("❌ Invalid customer ID format in cookie.")
        raise HTTPException(status_code=400, detail="Invalid customer ID in cookie.")

    # Simulated database check (replace with your actual DB logic)
    customer_data = customers_collection.find_one({"CustomerID": customer_id})
    if not customer_data:
        logger.warning(f"❌ No customer found in DB with ID: {customer_id}")
        raise HTTPException(status_code=404, detail="Customer not found")

    logger.info(f"✅ Customer found in DB with ID: {customer_id}")
    return JSONResponse(content={"customer_id": customer_id})



@feedback_form_router.post("/submit")
async def submit_feedback(feedback: Feedback, request: Request ,customer_id: str = Cookie(None)):
    customer_id = int(request.cookies.get("customer_id"))

    if not customer_id:
        raise HTTPException(status_code=401, detail="Unauthorized. Please log in.")
    try:
        customer_id = int(customer_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid customer ID in cookie.")
    if customer_id is None:
        logger.warning("❌ No customer_id cookie found in request.")
        raise HTTPException(status_code=401, detail="Not logged in")
    logger.info(f"✅ Feedback submitted by customer_id: {customer_id}")

    # Check if the customer exists
    customer_record = customers_collection.find_one({"CustomerID": customer_id})
    if not customer_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")

    # Complaints mapping
    complaints = {
        "Dissatisfaction": feedback.dissatisfaction,
        "Price": feedback.price,
        "Attitude": feedback.attitude,
        "Customer Service": feedback.service,
        "Other": feedback.otherComments
    }

    if not feedback.email or not feedback.age or not any(v not in ["No", None, ""] for v in complaints.values()):
        raise HTTPException(status_code=400, detail="Incomplete form submission")

    complaint_values = {
        "ComplainID": get_next_complain_id(),
        "CustomerID": customer_id,
        "Email": feedback.email,
        "Age": feedback.age,
        "Complain_Type_Dissatisfaction": 1 if complaints["Dissatisfaction"] in ["Product Dissatisfaction", "Service Dissatisfaction"] else 0,
        "Complain_Type_Price": 1 if complaints["Price"] in ["High Monthly Charges", "Unexpected Fees"] else 0,
        "Complain_Type_Attitude": 1 if complaints["Attitude"] in ["Rude Behaviour", "Lack of Politeness"] else 0,
        "Complain_Type_Customer_Service": 1 if complaints["Customer Service"] in ["Service Dissatisfaction", "Product Dissatisfaction"] else 0,
        "Complain_Type_Other": 1 if complaints["Other"] else 0,
        "Other_Complain": complaints["Other"],
        "No_of_Complains": sum(1 for v in complaints.values() if v not in ["No", None, ""])
    }

    customer_complains_collection.insert_one(complaint_values)

    updates = {
        "No_of_Complains": customer_record.get("No_of_Complains", 0) + complaint_values["No_of_Complains"],
        "Complain_Type_Dissatisfaction": max(customer_record.get("Complain_Type_Dissatisfaction", 0), complaint_values["Complain_Type_Dissatisfaction"]),
        "Complain_Type_Price": max(customer_record.get("Complain_Type_Price", 0), complaint_values["Complain_Type_Price"]),
        "Complain_Type_Attitude": max(customer_record.get("Complain_Type_Attitude", 0), complaint_values["Complain_Type_Attitude"]),
        "Complain_Type_Customer_Service": max(customer_record.get("Complain_Type_Customer_Service", 0), complaint_values["Complain_Type_Customer_Service"]),
        "Complain_Type_Other": max(customer_record.get("Complain_Type_Other", 0), complaint_values["Complain_Type_Other"]),
    }
    customers_collection.update_one({"CustomerID": customer_id}, {"$set": updates})

    return {"message": "Feedback submitted successfully!"}

@feedback_form_router.post("/logout")
async def logout():
    response = JSONResponse(content={"message": "Logged out"})
    response.delete_cookie("customer_id")
    return response


# Include routers
app.include_router(feedback_form_router, prefix="/feedback", tags=["feedback"])
