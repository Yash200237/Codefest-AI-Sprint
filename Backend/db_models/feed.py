from sqlalchemy import Column, Integer, Text, Date, PrimaryKeyConstraint, String
from database import Base

class Feedback(Base):
    __tablename__ = "products"
    product_id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(100), unique=False, index=False )
    
class Reviews(Base):
    __tablename__ = "customer_reviews"

    customer_id = Column(Integer, index=True)
    product_id = Column(Integer, index=False)
    review_date = Column(Date, index=False)
    review = Column(Text, index=False)

    __table_args__ = (
        PrimaryKeyConstraint('customer_id', 'product_id', 'review_date'),
    )