from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from databases import Database

# Replace with your MySQL credentials
DATABASE_URL = "mysql+mysqlconnector://<username>:<password>@<host>/<database>"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
database = Database(DATABASE_URL)

Base: DeclarativeMeta = declarative_base()
