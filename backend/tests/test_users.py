def test_create_user(client):
    response = client.post(
        "/api/users/",
        json={"username": "testuser", "email": "test@example.com", "password": "testpassword"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    user_id = data["id"]

    response = client.get(f"/api/users/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["email"] == "test@example.com"
