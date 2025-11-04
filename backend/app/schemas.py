from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class IssueBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str
    priority: str

class IssueCreate(IssueBase):
    pass

class Issue(IssueBase):
    id: int
    project_id: int
    assignee_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    name: str
    key: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    issues: List[Issue] = []

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    issues: List[Issue] = []

    class Config:
        from_attributes = True
