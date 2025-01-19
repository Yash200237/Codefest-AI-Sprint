from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd

router = APIRouter()

# Loading the required models and encoders
category_model_path = "./Models/category_model.joblib"
category_preprocessor_path = "./Models/category_preprocessor.joblib"
products_model_path = './Models/products_model.joblib'
products_preprocessor_path = './Models/products_preprocessor.joblib'
products_outputencoder_path = './Models/product_output_encoders.joblib'

try:
    category_model = joblib.load(category_model_path)
    category_preprocessor = joblib.load(category_preprocessor_path)
    products_model = joblib.load(products_model_path)
    products_preprocessor = joblib.load(products_preprocessor_path)
    products_output_encoder = joblib.load(products_outputencoder_path)
except FileNotFoundError:
    raise RuntimeError("One or more model files are missing. Ensure they are in the correct path.")

# Define class labels for category predictions
class_labels = [
    "Vegetables", "Fruits", "Dairy", "Grains",
    "Meat", "Frozen Foods", "Seafood", "Beverages"
]

# Function to convert category predictions to string labels
def convert_predictions_to_string(predictions):
    result = []
    for pred in predictions:
        selected_categories = [
            class_labels[i] for i in range(len(pred)) if pred[i] == 1
        ]
        result.append(", ".join(selected_categories))
    return result

# Define input schema using Pydantic
class InputData(BaseModel):
    category: str
    subcategory: str
    scale: str
    location: str
    years_in_business: int
    employees: int
    estimated_daily_customers: int
    avg_order_size: float
    storage_capacity: str
    sustainability_focus: bool
    quality_preference: str

@router.post("/recommend")
async def recommend(data: InputData):
    # Convert input data to a DataFrame
    input_df = pd.DataFrame([data.model_dump()])

    # Step 1: Preprocess the input for the first model
    processed_input = category_preprocessor.transform(input_df)

    # Step 2: Predict categories with the first model
    category_predictions = category_model.predict(processed_input)

    # Convert category predictions to string labels
    predicted_categories = convert_predictions_to_string(category_predictions)
    input_df['predicted_categories'] = predicted_categories

    # Step 3: Prepare data for the second model
    second_model_rows = []
    for _, row in input_df.iterrows():
        categories = row['predicted_categories'].split(', ')
        for category in categories:
            second_model_rows.append({
                "scale": row["scale"],
                "location": row["location"],
                "storage_capacity": row["storage_capacity"],
                "quality_preference": row["quality_preference"],
                "product_category": category,
                "sustainability_focus": row["sustainability_focus"]
            })

    # Create DataFrame for the second model
    second_model_df = pd.DataFrame(second_model_rows)

    # Preprocess the input for the second model
    processed_second_input = products_preprocessor.transform(second_model_df)

    # Step 4: Predict products with the second model
    product_predictions = products_model.predict(processed_second_input)

    # Decode product predictions
    decoded_predictions = pd.DataFrame(product_predictions, columns=['top_product', 'second_product', 'third_product'])
    for col in decoded_predictions.columns:
        decoded_predictions[col] = products_output_encoder[col].inverse_transform(decoded_predictions[col])

    # Combine predictions into a single string for products
    final_outputs = []
    for i, row in second_model_df.iterrows():
        top_product = decoded_predictions.iloc[i]['top_product']
        second_product = decoded_predictions.iloc[i]['second_product']
        third_product = decoded_predictions.iloc[i]['third_product']
        final_outputs.append(f"{top_product}, {second_product}, {third_product}")

    # Step 5: Return the aggregated results
    return {"recommended_products": ", ".join(final_outputs)}
