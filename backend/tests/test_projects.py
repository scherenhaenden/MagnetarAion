def test_create_project(client):
    response = client.post(
        "/api/projects/",
        json={"name": "Test Project", "key": "TEST"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Project"
    assert "id" in data
    project_id = data["id"]

    response = client.get("/api/projects/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Test Project"
