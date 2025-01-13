from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# MySQL connection string
URL_DATABASE = "mysql+pymysql://root:yashodha@localhost:3306/smartfoodie"

engine = create_engine(URL_DATABASE)

# Create a session for database interaction
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()
