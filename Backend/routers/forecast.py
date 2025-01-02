from fastapi import APIRouter,HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

router = APIRouter()

#Loading the required models and encoder
revenue_model_path = "./Models/sales_revenue_model (1).pkl"
ratio_model_path ="./Models/sales_ratio_model (1).pkl"
encoder_path ="./Models/sales_encoder (1).pkl"
model_input_columns = joblib.load("./Models/model_input_columns.pkl")
try:
    revenue_model = joblib.load(revenue_model_path)
    ratio_model =joblib.load(ratio_model_path)
    encoder = joblib.load(encoder_path)
except FileNotFoundError:
    raise RuntimeError("One or more model files are missing. Ensure they are in the correct path.")

# Define the input schema
class PredictionRequest(BaseModel):
    product_name: str
    category: str
    month: int

    class Config:
        min_anystr_length = 1
        anystr_strip_whitespace = True

def preprocess_input(data: dict, encoder):
    """
    Preprocess user input for the ML models.
    """
    # Convert input to DataFrame
    df = pd.DataFrame([data])

    # Encode categorical features
    encoded_features = encoder.transform(df[["product_name", "category"]])
    encoded_df = pd.DataFrame(
        encoded_features, 
        columns=encoder.get_feature_names_out(["product_name", "category"])
    )
    
    # Combine encoded features with numerical features (e.g., month)
    numerical_features = df.drop(columns=["product_name", "category"]).reset_index(drop=True)
    final_features = pd.concat([numerical_features, encoded_df], axis=1)
    
    # Ensure column order matches the training data
    final_features = final_features.reindex(columns=model_input_columns, fill_value=0)
    
    return final_features


def convert_numpy_float(obj):
    """
    Convert numpy.float32 to native Python float for serialization.
    """
    if isinstance(obj, np.float32):
        return float(obj)
    return obj

@router.post("/predict")
async def predict_sales(data: PredictionRequest):
    """
    Endpoint to handle revenue and sold ratio predictions.
    """
    try:
        # Preprocess user input
        input_data = preprocess_input(data.model_dump(), encoder)
        
        # Predict revenue and sold ratio
        revenue_prediction = revenue_model.predict(input_data)[0]
        ratio_prediction = ratio_model.predict(input_data)[0]

        # Convert predictions to standard Python float types
        revenue_prediction = convert_numpy_float(revenue_prediction)
        ratio_prediction = convert_numpy_float(ratio_prediction)
        
        return {
            "message": "Prediction successful",
            "total_revenue_prediction": revenue_prediction,
            "sold_ratio_prediction": ratio_prediction
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
















