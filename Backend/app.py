
from fastapi import FastAPI
from routers import summarize, forecast, feedback,recommend
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sales Consultant API", version = '1.0.0')

origins=[
    "http://localhost", 
    "http://localhost:3000",
]
app.add_middleware( 
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True,
     allow_methods=["*"], 
     allow_headers=["*"], )
# Include routers
app.include_router(summarize.router, prefix="/api", tags=["Summarization"])
app.include_router(forecast.router,prefix="/api",tags=["Forecast"])
app.include_router(feedback.router,prefix='/api',tags=["Feedback"])
app.include_router(recommend.router,prefix='/api',tags=["Recommendation"])


