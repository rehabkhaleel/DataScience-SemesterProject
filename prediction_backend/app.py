from fastapi import FastAPI, HTTPException
import pandas as pd
import cloudpickle
import logging
import asyncio
import json

app = FastAPI()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load model pipeline
try:
    with open("churn_pipeline_lightgbm_top11_simple.pkl", "rb") as f:
        pipeline = cloudpickle.load(f)
    logger.info("✅ Model pipeline loaded successfully.")
except Exception as e:
    logger.exception("❌ Failed to load model pipeline.")

# Load category levels
try:
    with open("category_levels_new_3.json", "r") as f:
        CATEGORY_LEVELS = json.load(f)
    logger.info("✅ Category levels loaded successfully.")
except Exception as e:
    CATEGORY_LEVELS = {}
    logger.exception("❌ Failed to load category levels.")

# Preprocessing function
def preprocess_customer_data(customer_data: dict) -> pd.DataFrame:
    logger.info("📦 Raw customer data received for preprocessing.")
    df = pd.DataFrame([customer_data])

    # Drop CustomerID if exists
    df.drop(columns=["CustomerID"], errors="ignore", inplace=True)

    # Rename to match training dataset
    rename_mapping = {
        'Number_of_Referrals': 'Number of Referrals',
        'Tenure_in_Months': 'Tenure in Months',
        'TotalLongDistanceCharges': 'Total Long Distance Charges',
        'No_of_Complains': 'No. of Complains',
        'Internet_Type': 'Internet Type',
        'Payment_Method': 'Payment Method'

    }
    df.rename(columns=rename_mapping, inplace=True)

    # Ensure all required columns exist
    required_columns = [
        'Tenure in Months', 'No. of Complains', 'TotalCharges',
        'Total Long Distance Charges', 'MonthlyCharges', 'Age',
        'Number of Referrals', 'Internet Type', 'Offer', 'Contract',
        'Payment Method'
    ]
    for col in required_columns:
        if col not in df.columns:
            df[col] = 0

    # Convert categorical features with fixed categories
# Convert categorical features with fixed categories
    categorical_cols = ['Contract', 'Internet Type', 'Offer', 'Payment Method']
    for col in categorical_cols:
        if col in df.columns and col in CATEGORY_LEVELS:
            # Handle list values (e.g., Payment Method)
            df[col] = df[col].apply(lambda x: x[0] if isinstance(x, list) and len(x) > 0 else x)

            # Apply categorical conversion
            df[col] = pd.Categorical(df[col], categories=CATEGORY_LEVELS[col])

            # Handle unknowns
            if df[col].isna().any():
                logger.warning(f"⚠️ Unknown value in column '{col}': {df[col].iloc[0]}")
                df[col] = df[col].cat.add_categories(["Unknown"]).fillna("Unknown")



    # Reorder
    df = df[required_columns]
    logger.info("✅ Preprocessing completed.")
    return df

# Prediction logic
async def make_prediction(df: pd.DataFrame):
    logger.info("🔍 Making prediction...")

    try:
        logger.info(f"📊 DataFrame shape: {df.shape}")
        #logger.info(f"📋 Columns: {df.columns.tolist()}")
        #logger.info(f"🔎 First row of data:\n{df.iloc[0].to_dict()}")
        #logger.info(f"Column dtypes before predict:\n{df.dtypes}")
        #logger.info(f"Category values:\n{ {col: df[col].unique().tolist() for col in df.select_dtypes('category')} }")

        logger.info("🚀 Calling pipeline.predict...")
        prediction = pipeline.predict(df)

        #logger.info("📈 Calling pipeline.predict_proba...")
        churn_prob = await asyncio.to_thread(pipeline.predict_proba, df)

        churn_prob = churn_prob[0][1] * 100
        logger.info(f"✅ Prediction: {prediction[0]}, Churn probability: {churn_prob:.2f}%")

        return int(prediction[0]), churn_prob

    except Exception as e:
        logger.exception("❌ Prediction failed.")
        raise HTTPException(status_code=500, detail="Model prediction error.")

@app.post("/predict")
async def predict(customer_data: dict):
    logger.info("📨 POST /predict called.")
    try:
        processed_df = preprocess_customer_data(customer_data)
        prediction, churn_probability = await make_prediction(processed_df)

        # Risk level logic
        if churn_probability > 65:
            risk = "High"
        elif 40 <= churn_probability <= 65:
            risk = "Moderate"
        else:
            risk = "Low"

        return {
            "Prediction": prediction,
            "churn_probability": f"{churn_probability:.2f}%",
            "risk_level": risk
        }

    except Exception as e:
        logger.exception("❌ Error in prediction route.")
        raise HTTPException(status_code=500, detail="Prediction error.")
