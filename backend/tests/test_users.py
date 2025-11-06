
def test_create_user(client):
    response = client.post(
        "/api/users/",
        json={"username": "testuser", "email": "test@example.com", "password": "testpassword"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data

    response = client.get(f"/api/users/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["email"] == "test@example.com"

def test_login_for_access_token(client):

    client.post(
        "/api/users/",
        json={"username": "testuser2", "email": "test2@example.com", "password": "testpassword"},
    )


    response = client.post(
        "/api/token",
        data={"username": "testuser2", "password": "testpassword"},
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
