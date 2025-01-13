from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from typing import Annotated
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from dotenv import load_dotenv
import os
from db_models.user import User
from db_models.deps import bcrypt_context, db_dependency,get_current_user

load_dotenv()

router = APIRouter()

SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")


# Pydantic models for request validation

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str


def authenticate_user(username: str, password: str, db):
        user = db.query(User).filter(User.username == username).first()
        if not user or not bcrypt_context.verify(password, user.hashed_password):
            return False
        return user


# Helper function to create JWT
def create_access_token(username: str, user_id: int, expires_delta: timedelta ):
    encode = {'sub': username, 'id': user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


# Login endpoint
@router.post("/login", response_model=TokenResponse)
async def login(user: LoginRequest, db: db_dependency):
    try:
        user = authenticate_user(user.username, user.password, db)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")

        token = create_access_token(user.username, user.id, timedelta(minutes=20))
        return {"access_token": token, "token_type": "bearer"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred during login")


@router.get("/validate-token")
async def validate_token(user: dict = Depends(get_current_user)):
    return {"message": "Token is valid", "user": user}

