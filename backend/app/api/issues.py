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
def read_issues(
    project_id: int | None = None,
    assignee_id: int | None = None,
    status: str | None = None,
    priority: str | None = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """Retrieve a list of issues from the database.
    
    This function queries the database for issues based on optional filters such as
    project_id, assignee_id, status, and priority. It allows pagination through
    the skip and limit parameters, returning a list of issues that match the
    specified criteria. The database session is managed through dependency
    injection  using the get_db function.
    """
    query = db.query(models.Issue)
    if project_id:
        query = query.filter(models.Issue.project_id == project_id)
    if assignee_id:
        query = query.filter(models.Issue.assignee_id == assignee_id)
    if status:
        query = query.filter(models.Issue.status == status)
    if priority:
        query = query.filter(models.Issue.priority == priority)
    issues = query.offset(skip).limit(limit).all()
    return issues
