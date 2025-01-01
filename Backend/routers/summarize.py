from fastapi import APIRouter
from pydantic import BaseModel
from transformers import pipeline

router = APIRouter()

summarization_model = pipeline("summarization", model= "t5-small")

# Input schema
class SummarizationInput(BaseModel):
    text: str

@router.post("/summarize/")
async def summarize(input: SummarizationInput):
    """Summarize the given text."""
    summary = summarization_model(
        input.text, max_length=100, min_length=25, do_sample=False
    )
    return {"summary": summary[0]["summary_text"]}