from fastapi import FastAPI, APIRouter
from database.connections import get_database
from pydantic import BaseModel

app = FastAPI()
fetch_complain = APIRouter()

db = get_database()
customer_complains_collection = db["Customer_Complains"]

class Complaint(BaseModel):
    ComplainID: int
    CustomerID: int
    Email: str
    Age: int
    Complain_Type_Dissatisfaction: int
    Complain_Type_Price: int
    Complain_Type_Attitude: int
    Complain_Type_Customer_Service: int
    Complain_Type_Other: int
    Other_Complain: str
    No_of_Complains: int

@fetch_complain.get("/complaints")
async def get_complaints():
    complaints = list(customer_complains_collection.find({}, {"_id": 0}))
    return complaints

# Correct - API under /api
app.include_router(fetch_complain, prefix="/api")
    