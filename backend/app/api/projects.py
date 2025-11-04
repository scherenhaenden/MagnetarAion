from fastapi import APIRouter, Depends
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
