from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.main import app
from backend.app.database import Base
from backend.app.dependencies import get_db
import pytest

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

@pytest.fixture(scope="module")
def test_data():
    # Create users
    """Fixture to create test users, projects, and issues."""
    user1_data = {"username": "user1", "email": "user1@example.com", "password": "password"}
    user2_data = {"username": "user2", "email": "user2@example.com", "password": "password"}
    client.post("/api/users/", json=user1_data)
    client.post("/api/users/", json=user2_data)

    # Create projects
    project1_data = {"name": "Project 1", "key": "PROJ1"}
    project2_data = {"name": "Project 2", "key": "PROJ2"}
    client.post("/api/projects/", json=project1_data)
    client.post("/api/projects/", json=project2_data)

    # Create issues
    issue1_data = {"title": "Issue 1", "description": "Description 1", "status": "Open", "priority": "High", "project_id": 1, "assignee_id": 1}
    issue2_data = {"title": "Issue 2", "description": "Description 2", "status": "In Progress", "priority": "Medium", "project_id": 1, "assignee_id": 2}
    issue3_data = {"title": "Issue 3", "description": "Description 3", "status": "Done", "priority": "Low", "project_id": 2, "assignee_id": 1}

    client.post("/api/projects/1/issues/", json=issue1_data)
    client.post("/api/projects/1/issues/", json=issue2_data)
    client.post("/api/projects/2/issues/", json=issue3_data)

def test_read_issues_no_filters(test_data):
    """Test reading issues without filters."""
    response = client.get("/api/issues/")
    assert response.status_code == 200
    assert len(response.json()) == 3

def test_read_issues_filter_by_project_id(test_data):
    response = client.get("/api/issues/?project_id=1")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert all(item['project_id'] == 1 for item in data)

def test_read_issues_filter_by_assignee_id(test_data):
    response = client.get("/api/issues/?assignee_id=1")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert all(item['assignee_id'] == 1 for item in data)

def test_read_issues_filter_by_status(test_data):
    """Test the API issues endpoint for filtering by status."""
    response = client.get("/api/issues/?status=Open")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]['status'] == "Open"

def test_read_issues_filter_by_priority(test_data):
    response = client.get("/api/issues/?priority=High")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]['priority'] == "High"

def test_read_issues_filter_by_project_id_and_status(test_data):
    """Test reading issues filtered by project ID and status."""
    response = client.get("/api/issues/?project_id=1&status=In%20Progress")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]['project_id'] == 1
    assert data[0]['status'] == "In Progress"
