from fastapi import FastAPI
from AdminLogin_Logic import admin_login_router
from CustLogin_Logic import customer_login_router
from feedbackform_Logic import feedback_form_router
from Complain_fetch import fetch_complain
from Predict_Handler import predict_router  # ✅ New router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Telecom Customer Application API",
    description="API for managing customer and admin operations, including feedback, prediction, and complaints.",
    version="1.0.0"
)

# Allow CORS (for frontend at localhost:3000)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(admin_login_router, prefix="/admin", tags=["Admin"])
app.include_router(customer_login_router, prefix="/customer", tags=["Customer"])
app.include_router(feedback_form_router, prefix="/feedback", tags=["Feedback"])
app.include_router(fetch_complain, prefix="/api", tags=["Complaints"])
app.include_router(predict_router, prefix="/predict", tags=["Prediction"])

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Telecom Customer Application API!"}
