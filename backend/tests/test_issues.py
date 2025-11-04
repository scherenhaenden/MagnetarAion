def test_create_issue(client):
    # First, create a project to associate the issue with
    response = client.post(
        "/api/projects/",
        json={"name": "Test Project", "key": "TEST"},
    )
    assert response.status_code == 200
    project_data = response.json()
    project_id = project_data["id"]

    response = client.post(
        f"/api/projects/{project_id}/issues/",
        json={"title": "Test Issue", "description": "Test Description", "status": "Open", "priority": "High"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Issue"
    assert "id" in data

    response = client.get(f"/api/issues/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Test Issue"
