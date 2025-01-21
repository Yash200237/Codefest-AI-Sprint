from fastapi import APIRouter, HTTPException,Depends
from pydantic import BaseModel
from transformers import pipeline
from collections import defaultdict
from database import SessionLocal_2
from sqlalchemy.orm import Session
from sqlalchemy import text  # Import text() from SQLAlchemy
from collections import defaultdict


router = APIRouter()

# Dependency to get a session for Database 2
def get_db_2():
    db2 = SessionLocal_2()
    try:
        yield db2
    finally:
        db2.close()

# Load the zero-shot classification and summarization models
summarization_model = pipeline("summarization", model="t5-small")
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# Input schema
class FeedbackInput(BaseModel):
    product_name: str

@router.post("/analyze_feedback/")
async def analyze_feedback(input: FeedbackInput, db: Session = Depends(get_db_2)):
    """Analyze comma-separated reviews and provide positive/negative summaries."""
    try:
        # Execute the stored procedure
        stored_procedure = text('CALL GetConcatenatedReviews(:product_name, @concatenated_reviews')
        
        
        # Execute the stored procedure with the input parameter
        db.execute(stored_procedure, {"product_name": input.product_name})
        db.commit()

        
        # Retrieve the OUT parameter
        result = db.execute(text("SELECT @concatenated_reviews AS concatenated_reviews")).fetchone()
        
        # Extract the result
        '''
        concatenated_reviews = result["concatenated_reviews"]      
          
        # Split the input text into individual reviews by commas
        concatenated_reviews = [review.strip() for review in concatenated_reviews.split('.')]

        # Initialize results storage by sentiment
        sentiment_results = defaultdict(list)

        # Process each review
        for review in concatenated_reviews:
            # Sentiment analysis: Determine if the review is positive or negative
            sentiment_result = sentiment_analyzer(review)
            sentiment_label = sentiment_result[0]['label']
            sentiment = 'Positive' if sentiment_label == 'POSITIVE' else 'Negative'

            # Summarization: Generate a summary of the review
            summary = summarization_model(review, max_length=100, min_length=25, do_sample=False)
            summary_text = summary[0]["summary_text"]

            # Store the sentiment and summary
            sentiment_results[sentiment].append(summary_text)

        # Combine positive and negative summaries into a single string
        result_text = ""
        for sentiment, summaries in sentiment_results.items():
            aggregated_summary = " ".join(summaries)
            
            # Summarize the aggregated reviews
            aggregated_summary_result = summarization_model(aggregated_summary, max_length=100, min_length=25, do_sample=False)
            final_summary = aggregated_summary_result[0]["summary_text"]

            # Append the result to the final text
            result_text += f"{sentiment} Summary: {final_summary}\n" 

        # Return the aggregated summaries
        return {"reviews_analysis": result_text.strip()}'''
        
        return {"reviews_analysis": result}


    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    




