import pytest

def get_auth_token(client):
    """
    Helper function to create a user and get an authentication token.
    """
    # Create a user first
    client.post(
        "/api/users/",
        json={"username": "testuser_auth", "email": "test_auth@example.com", "password": "testpassword"},
    )
    # Get a token
    response = client.post(
        "/api/token",
        data={"username": "test_auth@example.com", "password": "testpassword"},
    )
    return response.json()["access_token"]


def test_create_user(client):
    response = client.post(
        "/api/users/",
        json={"username": "testuser", "email": "test@example.com", "password": "testpassword"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data

    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/users/", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0


def test_login_for_access_token(client):
    client.post(
        "/api/users/",
        json={"username": "testuser2", "email": "test2@example.com", "password": "testpassword"},
    )

    response = client.post(
        "/api/token",
        data={"username": "test2@example.com", "password": "testpassword"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_for_access_token_invalid_credentials(client):
    client.post(
        "/api/users/",
        json={"username": "testuser3", "email": "test3@example.com", "password": "testpassword"},
    )

    response = client.post(
        "/api/token",
        data={"username": "testuser3", "password": "wrongpassword"},
    )
    assert response.status_code == 401


def test_user_model_has_is_active_attribute(client):
    """
    Test that the User model has the is_active attribute.
    """
    # Create a user first
    client.post(
        "/api/users/",
        json={"username": "testuser_active", "email": "test_active@example.com", "password": "testpassword"},
    )
    # Get a token
    response = client.post(
        "/api/token",
        data={"username": "test_active@example.com", "password": "testpassword"},
    )
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/users/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "is_active" in data
    assert data["is_active"] is True
