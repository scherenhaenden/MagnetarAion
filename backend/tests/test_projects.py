
def test_create_project(client):
    response = client.post(
        "/api/projects/",
        json={"name": "Test Project", "key": "TEST"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Project"
    assert "id" in data

    response = client.get("/api/projects/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Test Project"

def test_assign_user_to_project(client):
    user_response = client.post(
        "/api/users/",
        json={"username": "testuser", "email": "test@example.com", "password": "testpassword"},
    )
    user_data = user_response.json()
    user_id = user_data["id"]

    project_response = client.post(
        "/api/projects/",
        json={"name": "Test Project 2", "key": "TEST2"},
    )
    project_data = project_response.json()
    project_id = project_data["id"]

    response = client.post(f"/api/projects/{project_id}/users/{user_id}")
    assert response.status_code == 200
    data = response.json()
    assert len(data["users"]) == 1
    assert data["users"][0]["username"] == "testuser"
