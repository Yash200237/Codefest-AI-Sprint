from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

# Load the first database URL
URL_DATABASE_1 = os.getenv("URL_DATABASE_1")

# Load the second database URL (Aiven MySQL from the image)
URL_DATABASE_2 = os.getenv("URL_DATABASE_2")

# Create engine for first database
engine_1 = create_engine(URL_DATABASE_1 + "?ssl_ca=ca.pem")

# Create engine for second database (Aiven MySQL)
engine_2 = create_engine(URL_DATABASE_2 + "?ssl_ca=ca2.pem")

# Create a session for the first database
SessionLocal_1 = sessionmaker(autocommit=False, autoflush=False, bind=engine_1)

# Create a session for the second database
SessionLocal_2 = sessionmaker(autocommit=False, autoflush=False, bind=engine_2)

# Base class for models
Base = declarative_base()
