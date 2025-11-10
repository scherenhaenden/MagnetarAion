from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..models import models
from .. import schemas
from ..dependencies import get_db, get_current_user
from ..core.security import get_password_hash, create_access_token, verify_password
from ..core.mail import send_password_reset_email
from datetime import datetime, timedelta
import secrets

router = APIRouter()

@router.post("/logout")
def logout():
    # This is a placeholder endpoint. In a stateless JWT setup, the client is responsible for deleting the token.
    # This endpoint can be used for server-side token invalidation if using a token blocklist.
    return {"msg": "Successfully logged out"}

@router.get("/users/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Create a new user in the database."""
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username, email=user.email, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users

@router.get("/setup_check", response_model=schemas.SetupCheck)
def setup_check(db: Session = Depends(get_db)):
    """Check if any users exist in the database."""
    user = db.query(models.User).first()
    return {"setup_needed": user is None}

@router.post("/token", response_model=schemas.Token)
def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user.email}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/password-reset-request")
def request_password_reset(request: schemas.PasswordResetRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user:
        # Don't reveal that the user doesn't exist
        return {"msg": "If a user with that email exists, a password reset link has been sent."}

    # Generate a secure, random token
    token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + timedelta(hours=1)

    # Store the token in the database
    reset_token = models.PasswordResetToken(
        user_id=user.id,
        token=token,
        expires_at=expires_at
    )
    db.add(reset_token)
    db.commit()

    # Send the password reset email
    send_password_reset_email(email=user.email, token=token)

    return {"msg": "If a user with that email exists, a password reset link has been sent."}


@router.post("/password-reset")
def reset_password(request: schemas.PasswordReset, db: Session = Depends(get_db)):
    # Find the token in the database
    reset_token = db.query(models.PasswordResetToken).filter(models.PasswordResetToken.token == request.token).first()

    # Validate the token
    if not reset_token or reset_token.used_at is not None or reset_token.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    # Find the user
    user = db.query(models.User).filter(models.User.id == reset_token.user_id).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid token")

    # Update the password
    hashed_password = get_password_hash(request.new_password)
    user.password = hashed_password
    db.add(user)

    # Mark the token as used
    reset_token.used_at = datetime.utcnow()
    db.add(reset_token)

    db.commit()

    return {"msg": "Password updated successfully"}
