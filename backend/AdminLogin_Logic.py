from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from database.connections import get_database

# Initialize the FastAPI app
app = FastAPI(
    title="Telecom Customer Application API",
    description="API for managing customer and admin operations, including feedback.",
    version="1.0.0"
)

db = get_database()

# Admin login logic
admin_login_collection = db["admin_login"]
admin_login_router = APIRouter()

class AdminLogin(BaseModel):
    username: str
    password: str

@admin_login_router.post("/login")
async def admin_login(credentials: AdminLogin):
    admin_id = credentials.username
    password = credentials.password

    if not admin_id or not password:
        raise HTTPException(status_code=400, detail="Admin ID and password are required")

    admin_user = admin_login_collection.find_one({"AdminID": admin_id})

    if not admin_user or password != admin_user["Password"]:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Admin login successful", "user": {"AdminID": admin_user["AdminID"]}}