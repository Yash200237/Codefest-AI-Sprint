from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from transformers import T5Tokenizer, T5ForConditionalGeneration

import os
from dotenv import load_dotenv

load_dotenv()

# Retrieve the token from the environment variables
TOKEN = os.getenv("HUGGINGFACE_TOKEN")
MODEL_NAME = "SubhaL/fine-tuned-t5-sales-report"

# Load model and tokenizer from Hugging Face Hub
try:
    tokenizer = T5Tokenizer.from_pretrained(MODEL_NAME,use_auth_token=TOKEN)
    model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME,use_auth_token=TOKEN)
except Exception as e:
    raise RuntimeError(f"Failed to load model from Hugging Face Hub: {str(e)}")
router = APIRouter()



# Input schema
class SalesInput(BaseModel):
    text: str

@router.post("/summarize/")
async def summarize(input: SalesInput):
    try:
        # Preprocess the input text
        input_ids = tokenizer(f"Generate a detailed report: {input.text}", return_tensors="pt").input_ids

        # Generate the output using the model
        output_ids = model.generate(input_ids, max_length=512, num_beams=5, early_stopping=True)

        # Decode the generated output
        output_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)

        return {"generated_report": output_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating report: {str(e)}")