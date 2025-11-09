from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import models
from .. import schemas
from ..dependencies import get_db

router = APIRouter()

@router.post("/projects/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    """Create a new project in the database."""
    db_project = models.Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/projects/", response_model=list[schemas.Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Retrieve a list of projects from the database."""
    projects = db.query(models.Project).offset(skip).limit(limit).all()
    return projects

@router.post("/projects/{project_id}/users/{user_id}", response_model=schemas.Project)
def assign_user_to_project(project_id: int, user_id: int, db: Session = Depends(get_db)):
    """Assign a user to a project."""
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    project.users.append(user)
    db.commit()
    db.refresh(project)
    return project
