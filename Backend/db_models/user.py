from sqlalchemy import Column, Integer, String
from db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=False, index=False )
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    contact_number = Column(String, unique=True, index=False)
    hashed_password = Column(String, unique=False, index=False)
