from fastapi import FastAPI, HTTPException, Depends, status
from routers import summarize, forecast, feedback, recommend, auth
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import db_models.user as user
from database import engine_1, engine_2, SessionLocal_1, SessionLocal_2, Base

app = FastAPI(title="Sales Consultant API", version="1.0.0")

# Create tables in both databases
Base.metadata.create_all(bind=engine_1)
Base.metadata.create_all(bind=engine_2)

# CORS setup
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Include routers
app.include_router(summarize.router, prefix="/api", tags=["Summarization"])
app.include_router(forecast.router, prefix="/api", tags=["Forecast"])
app.include_router(feedback.router, prefix='/api', tags=["Feedback"])
app.include_router(recommend.router, prefix='/api', tags=["Recommendation"])
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
