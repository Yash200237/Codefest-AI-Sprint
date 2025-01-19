from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

# MySQL connection string
URL_DATABASE = os.getenv("URL_DATABASE")

engine = create_engine(
    URL_DATABASE + "?ssl_ca=ca.pem"
)

# Create a session for database interaction
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()
