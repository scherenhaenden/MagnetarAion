from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class RoleBase(BaseModel):
    name: str
    description: Optional[str] = None

class RoleCreate(RoleBase):
    pass

class Role(RoleBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class IssueBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str
    priority: str

class IssueCreate(IssueBase):
    assignee_id: Optional[int] = None

class Issue(IssueBase):
    id: int
    project_id: int
    assignee_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ProjectBase(BaseModel):
    name: str
    key: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class Project(ProjectBase):
    id: int
    issues: List[Issue] = []
    users: List[UserBase] = []

    model_config = ConfigDict(from_attributes=True)

class User(UserBase):
    id: int
    issues: List[Issue] = []
    roles: List[Role] = []
    projects: List[ProjectBase] = []

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
