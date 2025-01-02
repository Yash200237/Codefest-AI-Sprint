from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from transformers import pipeline

router = APIRouter()

recommendation_dict = {
    ("Small", "Restaurant"): [
        {"id": 1, "name": "Chips", "category": "Snacks"},
        {"id": 2, "name": "Salsa Sauce", "category": "Condiments"},
        {"id": 18, "name": "Beetroots", "category": "Vegetables"},
        
    ],
    ("Medium", "Restaurant"): [
        {"id": 3, "name": "Cheddar Cheese", "category": "Dairy"},
        {"id": 10, "name": "Pasta", "category": "Grains"},
        {"id": 20, "name": "Beef", "category": "Meat"},
        
    ],
    ("Large", "School"): [
        {"id": 5, "name": "Olive Oil", "category": "Oils"},
        {"id": 4, "name": "Bulk Rice", "category": "Grains"},
        {"id": 9, "name": "Milk", "category": "Dairy"},
        {"id": 11, "name": "Apples", "category": "Fruits"},
        {"id": 22, "name": "Bananas", "category": "Fruits"},
        {"id": 23, "name": "Carrots", "category": "Vegetables"},
    ],
    ("Large", "Restaurant"): [
        {"id": 6, "name": "Coconut Oil", "category": "Oils"},
        {"id": 7, "name": "Oats", "category": "Grains"},
        {"id": 8, "name": "Lettuce", "category": "Vegetables"},
        {"id": 12, "name": "Tomatoes", "category": "Vegetables"},
        {"id": 24, "name": "Chicken Breast", "category": "Meat"},
        {"id": 25, "name": "Garlic", "category": "Spices"},
    ],
    ("Small", "Catering"): [
        {"id": 13, "name": "Bread Rolls", "category": "Bakery"},
        {"id": 14, "name": "Jam", "category": "Condiments"},
        {"id": 26, "name": "Butter", "category": "Dairy"},
        {"id": 27, "name": "Orange Juice", "category": "Beverages"},
    ],
    ("Medium", "Bakery"): [
        {"id": 15, "name": "Wheat", "category": "Grains"},
        {"id": 16, "name": "Milk", "category": "Dairy"},
        {"id": 17, "name": "Wine", "category": "Beverages"},
        {"id": 28, "name": "Sugar", "category": "Condiments"},
        {"id": 29, "name": "Eggs", "category": "Dairy"},
    ],
}

# Summarization pipeline
summarizer = pipeline("summarization", model="t5-small", tokenizer="t5-small")

# Paraphrasing pipeline
#paraphraser = pipeline("text2text-generation", model="t5-small")

# Input schema
class CustomerDetails(BaseModel):
    scale: str  # e.g., "Small", "Medium", "Large"
    company_type: str  # e.g., "Restaurant", "School", "Catering"

@router.post("/recommend/")
async def recommend(customer: CustomerDetails):
    # Validate input
    if not customer.scale or not customer.company_type:
        raise HTTPException(
            status_code=400, detail="Both 'scale' and 'company_type' must be provided."
        )
    
    # Fetch recommendations based on the scale and company type
    recommendations = recommendation_dict.get((customer.scale, customer.company_type), None)
    
    if recommendations is None:
        raise HTTPException(
            status_code=404,
            detail=f"No recommendations found for scale '{customer.scale}' and company type '{customer.company_type}'.",
        )
    
    # Create a plain text description
    product_names = [product["name"] for product in recommendations]
    plain_text = (
        f"For a {customer.scale.lower()}-scale {customer.company_type.lower()}, "
        f"we recommend the following products: {', '.join(product_names)}."
    )
    
    # Generate a detailed response
    try:
        summarized_text = summarizer(
            plain_text, max_length=50, min_length=10, do_sample=False
        )[0]["summary_text"]

        
        # Paraphrase the summarized response
        '''paraphrased_text = paraphraser(
            plain_text, max_length=100, num_return_sequences=1
        )[0]["generated_text"]'''
        

        summarized_text = f"Thank you for providing the details. {summarized_text}"

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error generating summary/paraphrase: {str(e)}"
        )
    
    return {"response": summarized_text}
