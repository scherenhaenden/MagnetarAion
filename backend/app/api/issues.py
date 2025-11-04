from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..models import models
from .. import schemas
from ..dependencies import get_db

router = APIRouter()

from fastapi import HTTPException

@router.post("/projects/{project_id}/issues/", response_model=schemas.Issue)
def create_issue_for_project(
    project_id: int, issue: schemas.IssueCreate, db: Session = Depends(get_db)
):
    """Create a new issue for a specified project."""
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    db_issue = models.Issue(**issue.model_dump(), project_id=project_id)
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue

@router.get("/issues/", response_model=list[schemas.Issue])
def read_issues(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Retrieve a list of issues from the database."""
    issues = db.query(models.Issue).offset(skip).limit(limit).all()
    return issues
