import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.main import app
from backend.app.database import Base
from backend.app.dependencies import get_db
from backend.app.models import models

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="function")
def db_session():
    """
    Create a new database session for each test function.
    """
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

def test_create_user(db_session):
    response = client.post(
        "/api/users/",
        json={"email": "test@example.com", "username": "testuser", "password": "password"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["username"] == "testuser"
    assert "id" in data
    user_in_db = db_session.query(models.User).filter(models.User.id == data["id"]).first()
    assert user_in_db is not None
    assert user_in_db.email == "test@example.com"

def test_login_for_access_token(db_session):
    # First, create a user
    client.post(
        "/api/users/",
        json={"email": "test@example.com", "username": "testuser", "password": "password"},
    )

    # Test login with correct credentials
    response = client.post(
        "/api/token",
        data={"username": "test@example.com", "password": "password"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

    # Test login with incorrect password
    response = client.post(
        "/api/token",
        data={"username": "test@example.com", "password": "wrongpassword"},
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Incorrect email or password"}

def test_password_reset_request(db_session):
    # Create a user
    client.post(
        "/api/users/",
        json={"email": "test@example.com", "username": "testuser", "password": "password"},
    )

    # Request a password reset
    response = client.post(
        "/api/password-reset-request",
        json={"email": "test@example.com"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["msg"] == "Password reset token created successfully."
    assert "token" in data
    token = data["token"]

    # Check that the token is in the database
    token_in_db = db_session.query(models.PasswordResetToken).filter(models.PasswordResetToken.token == token).first()
    assert token_in_db is not None

def test_password_reset(db_session):
    # Create a user and request a password reset token
    client.post(
        "/api/users/",
        json={"email": "test@example.com", "username": "testuser", "password": "password"},
    )
    response = client.post(
        "/api/password-reset-request",
        json={"email": "test@example.com"},
    )
    token = response.json()["token"]

    # Reset the password
    response = client.post(
        "/api/password-reset",
        json={"token": token, "new_password": "newpassword"},
    )
    assert response.status_code == 200
    assert response.json() == {"msg": "Password updated successfully"}

    # Try to log in with the new password
    response = client.post(
        "/api/token",
        data={"username": "test@example.com", "password": "newpassword"},
    )
    assert response.status_code == 200

    # Try to log in with the old password
    response = client.post(
        "/api/token",
        data={"username": "test@example.com", "password": "password"},
    )
    assert response.status_code == 401

def test_password_reset_with_invalid_token(db_session):
    response = client.post(
        "/api/password-reset",
        json={"token": "invalidtoken", "new_password": "newpassword"},
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid or expired token"}

def test_read_users_me(db_session):
    # Create a user and get a token
    client.post(
        "/api/users/",
        json={"email": "test@example.com", "username": "testuser", "password": "password"},
    )
    response = client.post(
        "/api/token",
        data={"username": "test@example.com", "password": "password"},
    )
    token = response.json()["access_token"]

    # Get the current user
    response = client.get(
        "/api/users/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["username"] == "testuser"

def test_read_users_me_unauthenticated(db_session):
    response = client.get("/api/users/me")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}

def test_logout(db_session):
    # Create a user and get a token
    client.post(
        "/api/users/",
        json={"email": "test@example.com", "username": "testuser", "password": "password"},
    )
    response = client.post(
        "/api/token",
        data={"username": "test@example.com", "password": "password"},
    )
    token = response.json()["access_token"]

    # Logout
    response = client.post(
        "/api/logout",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    assert response.json() == {"msg": "Successfully logged out"}
