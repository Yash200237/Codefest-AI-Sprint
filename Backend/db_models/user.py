from sqlalchemy import Column, Integer, Text, Date, String
from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=False, index=False )
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    contact_number = Column(String(20), unique=True, index=False)
    hashed_password = Column(String(255), unique=False, index=False)
