
def test_create_role(client):
    response = client.post(
        "/api/roles/",
        json={"name": "admin", "description": "Administrator role"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "admin"
    assert "id" in data

    response = client.get("/api/roles/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "admin"

def test_assign_role_to_user(client):
    user_response = client.post(
        "/api/users/",
        json={"username": "testuser", "email": "test@example.com", "password": "testpassword"},
    )
    user_data = user_response.json()
    user_id = user_data["id"]

    role_response = client.post(
        "/api/roles/",
        json={"name": "admin", "description": "Administrator role"},
    )
    role_data = role_response.json()
    role_id = role_data["id"]

    response = client.post(f"/api/users/{user_id}/roles/{role_id}")
    assert response.status_code == 200
    data = response.json()
    assert len(data["roles"]) == 1
    assert data["roles"][0]["name"] == "admin"
