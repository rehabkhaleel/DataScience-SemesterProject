from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from database.connections import get_database
import logging

db = get_database()
customer_login_collection = db["customer_logins"]
customer_login_router = APIRouter()

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class CustomerLogin(BaseModel):
    username: str
    password: str

@customer_login_router.post("/login")
async def customer_login(credentials: CustomerLogin):
    customer_id = credentials.username
    password = credentials.password

    if not customer_id.isdigit():
        raise HTTPException(status_code=400, detail="Customer ID must be numeric")

    customer_user = customer_login_collection.find_one({"CustomerID": int(customer_id)})

    if not customer_user or password != customer_user["Password"]:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    response = JSONResponse(content={
        "message": "Login successful",
        "user": {"CustomerID": customer_user["CustomerID"]}
    })
    response.set_cookie(
        key="customer_id",
        value=str(customer_user["CustomerID"]),
        httponly=True,
        samesite="None", 
        secure=True,
        path="/"
    )

    logger.info(f"✅ Cookie set for CustomerID: {customer_user['CustomerID']}")
    return response