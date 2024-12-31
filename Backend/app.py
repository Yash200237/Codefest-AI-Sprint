from fastapi import FastAPI
from routers import summarize

app = FastAPI(title="Sales Consultant API", version = '1.0.0')

# Include routers
app.include_router(summarize.router, prefix="/api", tags=["Summarization"])